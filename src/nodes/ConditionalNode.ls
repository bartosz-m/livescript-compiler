import
    \./JsNode
    \./nop
    \./symbols : {copy}

always-true = JsNode.copy!
    ..name = \always-true
    ..js-function = -> true

export default ConditionalNode = ^^null
ConditionalNode <<<
    name: \ConditionalNode
    
    next: nop
    
    condition: always-true
    
    nodes-names: <[ condition next ]>
        
    exec: (value) ->
        try
          if @condition.exec value
              @next.exec value
        catch
            e.message = "#{e.message} at node #{@name}"
            throw e

    (copy): ->
        ^^@
            nodes-names = Array.from ..nodes-names
            for name in ..nodes-names
                ..[name] = ..[name][copy]!