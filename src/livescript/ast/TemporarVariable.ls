import
    \../../core/symbols : { init }
    \../../composition : { import-properties }
    \../../core/components/Creatable
    \./symbols : ...
    \./Node
  
export default TemporarVariable = ^^Node
    import-properties .., Creatable
TemporarVariable <<<    
    (type): \TemporarVariable
    
    (init): (@{name,is-export,is-import}) !->
        @_name = @name
      
    traverse-children: (visitor, cross-scope-boundary) ->
    
    compile: (o) ->
        unless @name == @_name
            @name = @_name
        @temporary-name ?= o.scope.temporary if @name?[type] == \Key 
            then @name.name
            else @name
        
        if @is-export or @is-import
            o.scope?variables["#{@temporary-name}."] = 'DONT TOUTCH'
        @to-source-node parts: [@temporary-name]