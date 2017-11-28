import
    \./JsNode
    \./symbols : { copy }

export default identity = JsNode.new -> it
identity
    module.exports = ..
    ..name = \identity
    ..is-constant = true
    Object.freeze ..
