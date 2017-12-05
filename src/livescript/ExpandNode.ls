import
    \js-nodes/symbols : { copy, as-node, js }

import
    \./ast/symbols : ...
    \./ast/utils : ...

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

# copy-source-location = (source, target) !->
#     if target.line?
#         return
#     {first-line,first-column,last-line,last-column,line,column,filename}  = source
#     unless line?
#         first_line = line = 10000000000
#         first_column = column = 10000000000
#         last_line = -1
#         last_column = -1
#         children = source.get-children!
#         for child in children
#             line = first_line = Math.min line, child.line if child.line?
#             line = first_line = Math.min line, child.first_line if child.first_line?
#             column = first_column = Math.min column, child.column if child.column?
#             column = first_column = Math.min column, child.first_column if child.first_column?
#             last_line = Math.max last_line, child.line if child.line?
#             last_line = Math.max last_line, child.last_line if child.last_line?
#             last_column = Math.max last_column, child.column if child.column
#             last_column = Math.max last_column, child.last_column if child.last_column
#             filename = filename or child.filename
# 
#     target <<< {first-line,first-column,last-line,last-column,line,column,filename}

export default ExpandNode =  ^^null
ExpandNode <<<
    name: \Expand
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
                        e.message += "\n at node #{@name} applyin #{rule.name}"
                        console.log e
                        throw e
            if changed
                to-exec.push ast-root
            else
                to-exec.push ...flatten execing.map ->
                    it.get-children?! # livescript generates additional nodes during compilation and we cannot touch them
    (copy): ->
        ^^@
            ..rules = @rules.map (.[copy]!)