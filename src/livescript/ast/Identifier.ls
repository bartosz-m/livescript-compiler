import
    \../../core/symbols : ...
    \./Node
    \./symbols : ...

camelize = (.replace /-[a-z]/ig -> it.char-at 1 .to-upper-case!)

export default Identifier = ^^Node
Identifier <<<    
    (type): \Identifier
    
    (init): (@{name}) !->
        unless @name?
            throw Error "Identifier doesn't have name "
      
    traverse-children: (visitor, cross-scope-boundary) ->
    
    compile: (o) ->
        if -1 != @name.search /\./
            throw Error "Incorrect identifier '#{@name}'. Identifier cannot have '.' at #{@line}:#{@column} in #{@filename}"
        @to-source-node parts: [ camelize @name ]
        
    value:~
        -> @name
        
    is-empty: -> false # assign is using this
    
    get-default: -> void # assign is using this
    
    is-assignable: -> true  # assign is using this
    
    var-name: -> @name  # assign is using this
    
    unwrap: -> @
    
    compile-node: ->
        @compile ...&