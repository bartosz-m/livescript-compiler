import
    \../../core/symbols : ...
    \./Node
    \./symbols : ...

export default Property = ^^Node
Property <<<
    (type): \Property.ast.LiveScript
    
    (init): (@{key,value}) !->
        for name in @children-names when child = @[name]
            child[parent] = @
        
    children-names: <[ key value ]>
      
    traverse-children: (visitor, cross-scope-boundary) ->
        if @key
            visitor @key, @, \key
            @key.traverse-children visitor, cross-scope-boundary
        if @value
            visitor @value, @, \value
            @value.traverse-children visitor, cross-scope-boundary
    
    compile: (o) ->
        if @value
            if @key
                @to-source-node parts: [ (@key.compile o) , " : ", @value.compile o ]
            else
                @to-source-node parts: [ @value.compile o ]
        else
            @to-source-node parts: [ (@key.compile o) ]