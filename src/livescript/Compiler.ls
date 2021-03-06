import
    \assert
    \path
    \./SourceNode
    \./Lexer
    \./ast/Node
    \./ast/symbols : ...
    \js-nodes : {ObjectNode, JsNode, SeriesNode, symbols : { copy, as-node, js } }
    \./ExpandNode
    \./ast/utils : ...
    \./validate-source-node

unified-replace-child = (child-to-replace, ...nodes) ->
    for name in @children when child = @[name]
        if child == child-to-replace
            if nodes.length > 1
                throw Error "Trying to insert multiple nodes at #{@[type]}.#{name} where only one is allowed"
            child[parent] = null
            @[name] = nodes.0
            nodes.0[parent] = @
            return child
        if \Array == typeof! child
            if -1  != idx = child.index-of child-to-replace
                child.splice idx, 1, ...nodes
                child[parent] = null
                for node in nodes
                    node[parent] = @
                return child
    
    throw Error "Trying to replace node witch is not child of current node"

unified-remove-child = (child-to-replace) ->
    for name in @children when child = @[name]
        if child == child-to-replace
            child[parent] = null
            @[name] = null
            return child
        if \Array == typeof! child
            if -1  != idx = child.index-of child-to-replace
                child.splice idx, 1
                child[parent] = null
                return child
    
    throw Error "Trying to replace node witch is not child of current node"

MAX_LINE = 999999

get-first-line = (node) ->
    if node.first_line? => node.first_line
    else
        first_line = MAX_LINE
        walk = (node) !->
            if node.first_line?
                first_line := first_line <? node.first_line
        node.traverse-children walk,true
        first_line

get-first-column = (node) ->
    if node.first_column? => node.first_column
    else
        { first_line } = node
        first_column = MAX_LINE
        walk = (node) !->
            if node.first_line == first_line and node.first_column?
                first_column := first_column <? node.first_column
        node.traverse-children walk,true
        first_column

deduce-source-location = (node) !->
    unless node.first_line?
        node.first_line = get-first-line node
        if node.first_line == MAX_LINE
            if node[parent]
                node.first_line = get-first-line node[parent]
        node.line = node.first_line
        
            
    unless node.first_column?
        node.first_column = get-first-column node
        if node.first_column == MAX_LINE
            if node[parent]
                node.first_column = get-first-column node[parent]
        node.column = node.first_column
  

AST = ObjectNode[copy]!properties
    ..[as-node]name = \ast.livescript

Prototype = Symbol \Prototype

super-compile = JsNode[copy]!
    ..name = \SuperCompile
    ..js-function = ->
        @[Prototype]compile-root ...

BlockCompile = SeriesNode[copy]!
    ..name = \compile.Block
    ..append super-compile[copy]!

wrap-node = (mapper) ->
    wrapped = -> mapper ...
    wrapped.node = mapper
    for let own k,v of mapper
        unless wrapped[k]
            Object.define-property wrapped, k, 
                enumerable: true
                configurable: false
                get: -> @node[k]
                set: -> @node[k] = it
    wrapped

AST.Block = ObjectNode[copy]!properties
    ..[as-node]name = \Block.ast.livescript
AST.Arr = ObjectNode[copy]!properties
    ..[as-node]name = \Arr.ast.livescript
AST.Assign = ObjectNode[copy]!properties
    ..[as-node]name = \Assign.ast.livescript
AST.Call = ObjectNode[copy]!properties
    ..[as-node]name = \Call.ast.livescript
AST.Chain = ObjectNode[copy]!properties
    ..[as-node]name = \Chain.ast.livescript
AST.Yield = ObjectNode[copy]!properties
    ..[as-node]name = \Yield.ast.livescript
AST.Cascade = ObjectNode[copy]!properties
    ..[as-node]name = \Cascade.ast.livescript


assert AST.Block != AST.Block[copy]!
assert AST.Block != AST[copy]!Block

BlockReplaceChild = JsNode.new (child, ...nodes) ->
    idx = @lines.index-of child
    unless idx > -1
        throw Error "Trying to replace node witch is not child of current node"
    unless nodes.length
        throw Error "Replace called without nodes"
    @lines.splice idx, 1, ...nodes
    for node in nodes
        node[parent] = @
    # child[parent] = null
    child

BlockRemoveChild = JsNode.new (child) ->
    idx = @lines.index-of child
    unless idx > -1
        throw Error "Trying to replace node witch is not child of current node"
    @lines.splice idx, 1
    child[parent] = null
    child


AST.Block
  ..Compile = BlockCompile
  ..replace-child = BlockReplaceChild[js]
  ..remove-child = BlockRemoveChild[js]

AssignReplaceChild = JsNode.new (child, ...nodes) ->
    if nodes.length != 1 
        throw new Error "Cannot replace child of assign with #{nodes.length} nodes."
    [new-node] = nodes
    if @left == child
        child[parent] = null
        @left = new-node
            ..[parent] = @
        
        child
    else if @right == child
        child[parent] = null
        @right = new-node
            ..[parent] = @
        child
    else
      throw new Error "Node is not child of Assign"

AssignReplaceChild
    ..name = \AssignReplaceChild

AST.Assign
    ..replace-child = AssignReplaceChild[js]
    
AST.Arr[as-node]import-enumerable do
    replace-child: unified-replace-child

AST.Call[as-node]import-enumerable do
    replace-child: unified-replace-child

AST.Yield[as-node]import-enumerable do
    replace-child: unified-replace-child
  
AST.Chain[as-node]import-enumerable do
    replace-child: unified-replace-child
    remove-child: unified-remove-child
    
AST.Cascade[as-node]import-enumerable do
    replace-child: AST.Chain.replace-child     
          
for k, NodeType of AST
    for k,v of Node{get-children, replace-with,to-source-node}
        NodeType[k] ?= JsNode.new v .[js]

assertions = SeriesNode[copy]!

assert-nodes = JsNode.new !->
    assertions.exec it, null, \root
    walk = (node,parent-node,name,index) !~>
        assertions ...
    it.traverse-children walk
      


            

export default Compiler = ^^ObjectNode
Compiler <<<
    lexer: ^^null
    
    init: ({@livescript,lexer}) !->
        @livescript <<< {lexer} if lexer
        for name,Type of @livescript.ast
            if Type?::?traverse-children
                for k,v of Node{get-children, replace-with,to-source-node}
                    Type::[k] ?= v
                
        @lexer = Lexer.create {@livescript}
        @ast = AST[copy]!
        assert @ast.Block != AST.Block
        @expand = ExpandNode[copy]!
        @postprocess-ast = SeriesNode[copy]!
            ..name = 'postprocessAst'
            ..this = @
        @postprocess-generated-code = SeriesNode[copy]!
            ..name = 'postprocessGeneratedCode'
            ..this = @
            ..append validate-source-node
        
        @add-source-map-url = SeriesNode[copy]!
            ..name = 'addSourceMapUrl'
            ..this = @
            ..append JsNode.new ({result, ast, code, options}) !->
                {filename, output-filename} = options
                if options.map is 'embedded'
                    result.map.set-source-content filename, code
                if options.map in <[ linked debug ]>
                    map-path = "#{path.basename output-filename}.map"
                    result.code += "\n//# sourceMappingURL=#map-path\n"
                else
                   result.code += "\n//# sourceMappingURL=data:application/json;base64,#{ new Buffer result.map.to-string! .to-string 'base64' }\n"
        
    
    nodes-names: <[
        ast lexer expand postprocessAst postprocessGeneratedCode
    ]>
    
    install: (livescript = @livescript) !->
        @livescript.compile = @~compile
        
    create: ->
        ^^@
            ..init ...&
            
    copy: ->
        ^^@
            ..nodes-names = Array.from ..nodes-names
            for name in ..nodes-names
                unless ..[name][copy]
                    throw Error "Compiler.#{name} doesn't have copy method"
                ..[name] = ..[name][copy]!
    
    convert-ast: (ast-root, options) ->
        ast-root <<< @ast.Block
            ..[Prototype] = Object.get-prototype-of ..
            ..[type] = @ast.Block[type]
        walk = (node,parent-node,name,index) !~>
            node <<< NodeType
                ..[type] = node@@name
                ..[parent] = parent-node
                ..filename = options.filename
                ..[Prototype] = Object.get-prototype-of ..
                
                for k,v of Node{get-children, replace-with,to-source-node}
                    ..[Prototype][k] ?= v
                ..[Prototype]replace-child ?= unified-replace-child
                  
            if NodeType = @ast[node@@name]
                node <<< NodeType
            
        ast-root.traverse-children walk, true
        ast-root
    
    generate-ast: (code, options) ->
        
        @convert-ast (@livescript.ast @lexer.lex.exec code), options
            .. <<< options{filename}
            @expand.exec ..
            assert-nodes.exec ..
            @postprocess-ast.exec ..
            # @fix-ast-source-map .., options.filename
            # assert-nodes.exec ..
    
    fix-node: (node, filename) !->
      assert filename
      if \String != typeof! node
          if node.line < 0
              console.log 'incorrect' node{line,column}
          unless node.source
              node.source = filename
          for child in node.children
              @fix-source-map child, filename
    
    fix-source-map: (node, filename) !->
        assert filename
        if \Array == typeof! node
            for n in node
                @fix-node n, filename
        else
            @fix-node node, filename
    
    fix-ast-source-map: (ast, filename) !->
        assert filename
        fix = !->
            it.filename = filename
            deduce-source-location it
            # copy-source-location it, it
        for e in ast[]exports
            fix e
            # copy-source-location e, e
        for e in ast[]imports
            fix e
            # copy-source-location e, e
        
        ast.traverse-children fix, true
        
    
    # add-source-map-url: ({result, ast, code, options}) !->
    #     {filename, output-filename} = options
    #     if ast.is-module
    #       output-filename.replace /\.js$/ '.mjs'
    #     if options.map is 'embedded'
    #         result.map.set-source-content filename, code
    #     if options.map in <[ linked debug ]>
    #         map-path = "#{path.basename output-filename}.map"
    #         result.code += "\n//# sourceMappingURL=#map-path\n"
    #     else
    #        result.code += "\n//# sourceMappingURL=data:application/json;base64,#{ new Buffer result.map.to-string! .to-string 'base64' }\n"
           
    compile-ast: ({ast, code, options}) ->
        unless options.filename
            options.filename = "tmp#{Date.now!}.ls"
        unless options.output-filename
            options.output-filename = options.filename.replace /\.ls$/ '.js'
        
        output = SourceNode.from-source-node ast.Compile.call ast, options
        output.set-file options.filename
        @fix-source-map output,options.filename
        @postprocess-generated-code.exec output
        if (map = options.map) and map != \none
            result = output.to-string-with-source-map!    
                ..ast = ast
                @add-source-map-url.exec {result,ast,code, options}
            result
        else
            output.to-string!
        

    # livescript compatible signature
    compile: (code, options = {}) ->
        unless options.filename
            options.filename = "tmp#{Date.now!}.ls"
        unless options.output-filename
            options.output-filename = options.filename.replace /\.ls$/ '.js'
        ast = @generate-ast code, options
        @compile-ast {ast,code,options}