import
    \../../core/symbols : ...
    \./Node
    \./symbols : ...

export default Assign = ^^Node
Assign <<<
    (type): \SmartAssign
    (init): (@{left, right}) ->
        @left[parent] = @
        @right[parent] = @
      
    traverse-children: (visitor, cross-scope-boundary) ->
        visitor @left
        visitor @right
        
    remove-child: (child) ->
        if @left == child
            @left = null
        else if @right == child
            @right = null
        else
            throw Error "Intertarnal compiler error"
    
    replace-child: (child, node) ->
        if @left == child
            @left = node
        else if @right == child
            @right = node
        else
            throw Error "Intertarnal compiler error"
    
    compile: (o) ->
        @to-source-node parts: [(@left.compile o), " = ", (@right.compile o)]

    terminator: ';'
