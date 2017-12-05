import
    \../../core/symbols : ...
    \./Node
    \./ObjectPattern
    \./Property
    \./symbols : ...
    \./utils : ...
    
get-identifier = -> it.value or it.name

export default Pattern = ^^Node
Pattern <<<
    (type): \Pattern
    (init): (@{items}) !->        
        for item,pos in @items
            if item[type] == \Prop
                @items[pos] = Property[create] key: item.key, value: item.val
                    copy-source-location item, ..
                    item = ..
            item[parent] = @
        
        for item in @items
            if item.value?[type] == \Obj
                {value} = item
                item.value = ObjectPattern[create] items: value.items
                item.value[parent] = item
                    copy-source-location value, ..
            
      
    traverse-children: (visitor, cross-scope-boundary) !->
        for item,i in @items
            visitor item, @, \items, i
        for item in @items
            item.traverse-children visitor, cross-scope-boundary
    
    compile: (o) ->
        items = @items.map ->
            if it.compile
                it.compile o
            else
                # console.log it.val
                if it.key
                    if it.val
                        "#{get-identifier it.key} : #{it.val.value}"
                    else
                        "#{get-identifier it.key}"
                else
                    "#{it.val.compile o}"
        items = items.join ', '
        @to-source-node parts: [ "{ ", ...items, " }"]

    terminator: ''
