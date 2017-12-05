import
    \source-map
    \js-nodes/symbols : { as-node }

Super = Symbol \Super

original-add = source-map.SourceNode::add

source-map.SourceNode::add = (a-chunk) ->
    if a-chunk[as-node]
        original-add.call @, "#{a-chunk}"
    else
        original-add ...

export default class SourceNode extends source-map.SourceNode
    (Super): source-map.SourceNode.prototype
    !->
        super ...
    
    set-file: (filename) ->
        @source = filename
        for child in @children when child instanceof source-map.SourceNode
            child.set-file filename

    @from-source-node = -> it with @prototype