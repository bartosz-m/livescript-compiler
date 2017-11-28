import
    \../../core/symbols : ...
    \./Node
    \./symbols : ...

export default Assign = ^^Node
Assign <<<
    (type): \SmartAssign
    (init): (@{left, right}) ->
      
    traverse-children: (visitor, cross-scope-boundary) ->
        visitor @left
        visitor @right
    
    compile: (o) ->
        @to-source-node parts: [(@left.compile o), " = ", (@right.compile o), @terminator ]

    terminator: ';'
