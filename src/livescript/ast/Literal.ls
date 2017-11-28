import
    \../../core/symbols : { init }
    \./Node
    \./symbols : { type }

export default Literal = ^^Node
Literal <<<
    (type): \Literal
    
    (init): (@{value}) !->
      
    traverse-children: (visitor, cross-scope-boundary) ->
    
    compile: (o) ->
        @to-source-node parts: [ @value ]