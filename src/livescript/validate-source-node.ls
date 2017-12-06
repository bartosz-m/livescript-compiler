import 
    \js-nodes : {JsNode}

export default validate-source-node = JsNode.new (source-node) ->
    errors = []
    validate = (node) !->
        unless  \String == typeof! node
            unless \Array == typeof! node
                unless node.source?
                    errors.push do
                        message: "missing source"
                        node: node
                if (node.children.length == 0)
                and node.to-string! != ''
                    if not node.line?
                        errors.push do
                            message: "missing file location"
                            children: node.children.length
                            node: node
                            code: node.to-string!
                    else
                        unless node.line >= 1
                            errors.push do
                                message: "invalid line"
                                node: node
                        unless node.column >= 0
                            errors.push do
                                message: "invalid column"
                                node: node
                for node.children => validate ..
            else
                for n in node => validate n
    validate source-node
    # console.log \errors errors if errors.length
    source-node