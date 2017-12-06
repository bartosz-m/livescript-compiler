require! {
    \path
    \chokidar
    \fs-extra : fs
}

lib-path = absolute-path '../tmp'
src-path = absolute-path '../src/'
process.on \exit !-> fs.remove lib-path

require! {
    \livescript : livescript
    \livescript/lib/lexer : livescript-lexer
    \livescript-transform-object-create
    \livescript-transform-esm/lib/plugin : transform-esm
    \../lib/livescript/Compiler : { __default__: Compiler }
}

livescript.lexer = livescript-lexer
ls-compiler = Compiler.create {livescript}
transform-esm.install ls-compiler, format: \cjs

absolute-path = -> path.normalize path.join __dirname, it


watching = true

default-options =
    map: 'linked'
    bare: true
    header: false
    format: \cjs

ls-ast = (code, options = {}) ->
      ast = livescript.ast code
      output = ast.compile-root options
      output.set-file options.relative-filename
      result = output.to-string-with-source-map!
          ..ast = ast

to-compile = 0

set-watching = ->
    watching := it
    if ready and to-compile == 0 and not watching
        watcher.close!
        fs.remove lib-path
        if errors.length
            deferred.reject errors
        else
            deferred.resolve!
        


compile = (filepath) !->>
    to-compile++
    relative-path = path.relative src-path, filepath
    try
        ls-code = await fs.read-file filepath, \utf8
        options =
            filename: filepath
            relative-filename: path.join \../src relative-path
            output-filename: relative-path.replace /.ls$/ '.js'
        js-result = ls-compiler.compile ls-code, options <<< default-options
        ext = if default-options.format == \esm and (js-result.ast.exports?length or js-result.ast.imports?length)
        then '.mjs'
        else '.js'
        relative-js-path = relative-path.replace '.ls', ext
        output = path.join lib-path, relative-js-path
        relative-map-file = "#relative-js-path.map"
        map-file = path.join lib-path, relative-map-file
        js-result
            ..source-map = ..map.to-JSON!
            ..code += "\n//# sourceMappingURL=#{path.basename map-file}\n"
        fs.output-file output, js-result.code
        fs.output-file map-file, JSON.stringify js-result.map.to-JSON!
    catch
        console.error e
        errors.push (e.stack or e.message)
    to-compile--
    set-watching watching

errors = []
ready = false
compiler = {}
deferred = {}
var watcher
compiler.run = ->
    deferred.promise = new Promise (deferred.resolve, deferred.reject) !->
    watcher := chokidar.watch "#{src-path}**/*.ls", ignored: /(^|[\/\\])\../
    .on \ready (event, filepath) ->
        ready := true
    .on \change compile
    .on \add compile
    .on \unlink (filepath) ->
        relative-path = path.relative src-path, filepath
        js-file = path.join lib-path, (relative-path.replace '.ls', '.js')
        map-file = js-file + \.map
        fs.remove js-file
        fs.remove map-file
    deferred.promise


Object.define-property compiler, \watch,
    get: -> watching
    set: set-watching


module.exports = compiler
