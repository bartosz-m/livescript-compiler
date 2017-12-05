import
    \../../core/symbols : ...
    \./Node
    \./Property
    \./symbols : ...
    \./utils : ...


export default ObjectPattern = ^^Node
ObjectPattern <<<
    (type): \ObjectPattern.ast.livescript
    (init): (@{items}) !->
        for item in @items
            item[parent] = @
        for item,pos in @items
            if item[type] == \Prop
                @items[pos] = Property[create] key: item.key, value: item.val
                    copy-source-location item, ..
                    item = ..
            item[parent] = @
      
    traverse-children: (visitor, cross-scope-boundary) ->
        for item,i in @items
            visitor item, @, \items, i
        for item in @items
            item.traverse-children visitor, cross-scope-boundary
    
    compile: (o) ->
        items = []
        for i in @items
            items.push i.compile o
            items.push ', '
        items.pop!
        @to-source-node parts: [ "{ ", ...items, " }"]

    terminator: ''
    
    replace-child: (child, node) ->
        unless -1 != idx = @items.index-of child
            throw Error "Node is not a child of ObjectPattern"
        @items.splice idx,1,node
        child
