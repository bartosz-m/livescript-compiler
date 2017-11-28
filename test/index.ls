require.extensions['.mjs'] = require.extensions['.js']
require! {
    \assert
    \livescript
    \livescript/lib/lexer
    \../lib/core/symbols : {create}
    \../lib/livescript/Compiler : {__default__: Compiler}
}

assert assert
assert Compiler, 'Compiler can be loaded'
assert Compiler.create, 'Compiler has create method'

livescript.lexer = lexer
ls-compiler = Compiler.create {livescript}

do !->>
    try
        await require \./self-build-test
    catch 
        console.log "self build failed with errors :\n #{e.map (.message) .join '\n'}"
        process.exit 1
