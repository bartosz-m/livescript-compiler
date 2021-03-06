import
    \./symbols : ...

export copy-source-location = (source, target) !->
    # unless source.line?
    #     console.log \missing source[type], source.first_line
    if target.line?
        return
    {first_line,first_column,last_line,last_column,line,column,filename}  = source
    # unless line?
    #     throw Error "there is no line at node #{source[type]} in #{source.filename}"
    #     first_line = line = 10000000000
    #     first_column = column = 10000000000
    #     last_line = -1
    #     last_column = -1
    #     if source.get-children
    #         children = source.get-children!
    #         for child in children
    #             line = first_line = Math.min line, child.line if child.line?
    #             line = first_line = Math.min line, child.first_line if child.first_line?
    #             column = first_column = Math.min column, child.column if child.column?
    #             column = first_column = Math.min column, child.first_column if child.first_column?
    #             last_line = Math.max last_line, child.line if child.line?
    #             last_line = Math.max last_line, child.last_line if child.last_line?
    #             last_column = Math.max last_column, child.column if child.column
    #             last_column = Math.max last_column, child.last_column if child.last_column
    #             filename = filename or child.filename
    #     else 
    #         console.log "missing get-children method at #{source}",source
        
    target <<< {first_line,first_column,last_line,last_column,line,column,filename}