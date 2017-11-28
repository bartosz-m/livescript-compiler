import
    \../../core/symbols : ...
    \./Node
    \./symbols : ...

export default Literal = ^^Node
Literal <<<
    (type): \Literal
    
    (init): (@{value}) !->
      
    traverse-children: (visitor, cross-scope-boundary) ->
    
    compile: (o) ->
        @to-source-node parts: [ @value ]