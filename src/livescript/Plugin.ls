# Base for all plugins
export default Plugin = ^^null
Plugin <<<
    get-default-compiler: ->
        require!{
            \livescript
            \livescript/lib/lexer
            \./Compiler
        }
        plugable-compiler = Symbol.for \plugable-compiler.livescript
        unless compiler = livescript[plugable-compiler]
            livescript[plugable-compiler] = compiler = Compiler.create {livescript,lexer}
            compiler.install!
        compiler

    install: (@livescript, config) !->
        @livescript = @get-default-compiler! unless @livescript
        @config <<< config
        my-symbol = Symbol.for "#{@name}.plugin.livescript"
        unless @livescript[my-symbol]
            @enable!
            @livescript[my-symbol] = true
    
    enable: !-> throw Error "Plugin must override 'enable' method"