import
    \./JsNode

import all \./symbols

export default TrueNode = ^^null
TrueNode <<<
    is-constant: true
    name: \True
    (copy): -> @
    value: true
    as-function: JsNode.new -> true

Object.freeze TrueNode
    