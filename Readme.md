Compiler for livescript language with support for plugins, working as an extension to original compiler.

WIP!!!

Compiler requires livescript from master branch on github, it doesn't work with npm version.

# Usage

This repo contains component meant to be only part of [system](https://www.npmjs.com/package/livescript-system) and its responsible for transformation of code and AST manipulations.

This is under constant development and I'm very messy coder so I advice any sane person not to dive into code of this one for now.

# Plugins

- [transform-esm](https://www.npmjs.com/package/livescript-transform-esm)  - es modules import & export
- [transform-implicit-async](https://www.npmjs.com/package/livescript-transform-implicit-async) - automatic `async` insertion
- [transform-object-create](https://www.npmjs.com/package/livescript-transform-object-create) - `Object.create` as an implementation of clone operator `^^`

# License
[BSD-3-Clause](License.md)