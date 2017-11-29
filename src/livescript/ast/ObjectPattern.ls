import
    \../../core/symbols : ...
    \./Node
    \./symbols : ...


export default ObjectPattern = ^^Node
ObjectPattern <<<
    (type): \ObjectPattern.ast.livescript
    (init): (@{items}) !->
        for item in @items
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
        unless idx = @items.index-of child
            throw Error "Node is not a child of ObjectPattern"
        @items.splice idx,1,node
        child
