import
    \../nodes/symbols : ...
    \./ast/symbols : ...

as-array = ->
    if Array.is-array it
    then it
    else [it]

flatten = (arr) ->
    result = []
    arr.for-each ->
        if Array.is-array it
            result.push ...it
        else
            result.push it
    result

copy-source-location = (source, target) !->
    if target.line?
        return
    {line,column,filename} = source
    unless line?
        line = 10000000000
        column = 10000000000
        children = source.get-children!
        for child in children
            line = Math.min line, child.line if child.line
            column = Math.min column, child.column if child.column
            filename = filename or child.filename
    
    target <<< {line,column,filename}

export default ExpandNode =  ^^null
ExpandNode <<<
    append: (rule) !->
        unless rule[copy]
            throw Error "Creating node #{rule.name ? ''} without copy method is realy bad practice"
        unless rule.name
            throw new Error "Adding rule without a name is realy bad practice"
        @rules.push rule
        
    remove: (rule-or-filter) ->
        idx = if \Function == typeof! rule-or-filter
              then @rules.find-index rule-or-filter
              else @rules.index-of rule-or-filter
        if idx != -1
            rule = @rules[idx]
            @rules.splice idx, 1
            rule
        else
            throw Error "Cannot remove rule - there is none matching"
      
    rules: [
    ]
    exec: (ast-root) !->
        changed = false
        to-exec = [ast-root]
        while to-exec.length
            changed = false
            execing = to-exec
            to-exec = []
            for node in execing
                for rule in @rules when mapped = rule.exec node
                    try
                        changed = true
                        new-nodes = as-array mapped
                        unless new-nodes.0
                            console.log \empty rule
                        for n in new-nodes
                            copy-source-location node, n
                        node.replace-with ...new-nodes
                        break
                    catch
                        console.log e.stack
                        e.message = "During #{rule.name} #{e.message}"
                        throw e
            if changed
                to-exec.push ast-root
            else
                to-exec.push ...flatten execing.map ->
                    it.get-children?! # livescript generates additional nodes during compilation and we cannot touch them
    (copy): ->
        ^^@
            ..rules = @rules.map (.[copy]!)