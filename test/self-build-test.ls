require! {
    \./self-compiler
}

self-compiler.watch = false
module.exports = self-compiler.run!
