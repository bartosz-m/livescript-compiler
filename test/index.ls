require.extensions['.mjs'] = require.extensions['.js']
require! {
    assert
    \livescript
    \livescript/lib/lexer
    \../lib/livescript/Compiler : {__default__: Compiler}
}

assert assert
assert Compiler
assert Compiler.create

livescript.lexer = lexer
ls-compiler = Compiler.create {livescript}

do !->>
    try
        await require \./self-build-test
    catch 
        console.log "self build failed with errors :\n #{e.map (.message) .join '\n'}"
        process.exit 1
