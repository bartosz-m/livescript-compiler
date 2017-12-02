import
    \assert
    \../SourceNode
    \../../core/components : { Creatable }
    \../../core/symbols : ...
    \../../composition : { import-properties }
    
    \../../nodes/ObjectNode
    \../../nodes/symbols : ...
    
    \./symbols : ...

debug-name = ->
    if it[type]
    then "[#{that}]"
    else "livescript.ast.#{it@@name}"

NodeNode = ObjectNode[copy]!
NodeNode.import-enumerable Creatable 

export default Node = NodeNode.properties
assert Node[create], "node.create"
assert.equal \Function typeof! Node[create]
assert.equal Node[as-node], NodeNode
NodeNode.import-enumerable do
# Node <<<
    (Symbol.has-instance): -> Object.is-prototype-of ...
    (type): \Node
    (init): !->
    is-statement: -> false
    
    terminator: '' # required by Block
    
    children-names: []
    
    unfold-soak: ->
    
    unparen: -> @
    
    remove: ->
        unless @[parent]remove-child
            Type = @[parent][type]
            throw Error "You need to implement method #{Type}::remove-child youreself"
        @[parent]remove-child @
    
    rip-name: !-> @name = it
    
    expand-slice: -> @
    
    unwrap: -> @
      
    rewrite-shorthand: (o, assign) !->
      
    each-child: (fn) !->
        for name in @children-names when child = @[name]
            fn child
      
    get-children: ->
        children = [] 
        @each-child !->
            children.push it
        children
      
    replace-child: ->
        if type = @[type]
            throw Error "You need to implement method #{type}::replace-child youreself"
        else
            console.log  @to-string!
            throw Error "You need to implement method ::replace-child youreself"
    
    replace-with: (...nodes) ->
        unless @[parent]
            throw Error "#{@[type]} doesn't have parent"
        unless @[parent].replace-child
            throw Error "#{@[parent][type]} doesn't imlement replace-child method"
        for node in nodes
            node[parent] = @[parent]
        @[parent].replace-child @, ...nodes
        
      
    compile: (options, level) ->
        o = {} <<< options
        o.level? = level
        node = @unfold-soak o or this
        # If a statement appears within an expression, wrap it in a closure.
        return node.compile-closure o if o.level and node.is-statement!
        unless node.compile-node
            throw Error "Unimplemented method compile-node in #{debug-name node}"
        code = (node <<< tab: o.indent).compile-node o
        if node.temps then for tmp in that then o.scope.free tmp
        code
        
    to-source-node: ({parts = []}) ->
        try
            parts = parts.map ->
                if \String == typeof! it then "#{it}"
                else it
            result = new SourceNode @line, @column, @filename, parts
            result.display-name = @[type]
            result
        catch e
            console.dir parts
            throw e