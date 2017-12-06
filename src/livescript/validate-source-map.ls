import 
    \sourcemap-validator
    \source-map : { SourceMapConsumer }

export default validate-source-map = ({ast,code,map}) ->
    errors = []
    try
        sourcemap-validator code, map.to-string!
    catch
        console.log e
    
    
    
    validate = (mapping) ->
        errors = []
        # unless mapping.source
        #     errors.push do
        #         message: "missing source"
        #         mapping: mapping
        #         filename: ast.filename
        if mapping.generated-line < 1
        or mapping.generated-column < 0
            errors.push do
                message: "invalid mapping"
                mapping: mapping
                filename: ast.filename
        unless mapping.original-line?
            errors.push do
                message: "missing original line"
                mapping: mapping
                filename: ast.filename
        unless mapping.original-column?
            errors.push do
                message: "missing column"
                mapping: mapping
                filename: ast.filename
        errors
    
    consumer = new SourceMapConsumer map.to-string!
    consumer.each-mapping validate
    
    # for mapping in map._mappings._array
    #     errors.push ...validate mapping
    console.log errors if errors.length
    errors
