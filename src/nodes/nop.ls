import 
    \./JsNode
    \./symbols : { copy }

export default nop = JsNode.new !->
nop
    ..name = \nop
    ..is-constant = true
    Object.freeze ..
