var assert = (require('assert')['__default__'] || require('assert'));
var path = (require('path')['__default__'] || require('path'));
var SourceNode = (require('./SourceNode')['__default__'] || require('./SourceNode'));
var Lexer = (require('./Lexer')['__default__'] || require('./Lexer'));
var Node = (require('./ast/Node')['__default__'] || require('./ast/Node'));
var { parent, type } = require('./ast/symbols');
var { ObjectNode, JsNode, SeriesNode, symbols : { copy, asNode, js } } = require('js-nodes');
var ExpandNode = (require('./ExpandNode')['__default__'] || require('./ExpandNode'));
var { copySourceLocation } = require('./ast/utils');
var validateSourceNode = (require('./validate-source-node')['__default__'] || require('./validate-source-node'));
var validateSourceMap = (require('./validate-source-map')['__default__'] || require('./validate-source-map'));
(function(){
  var unifiedReplaceChild, unifiedRemoveChild, MAX_LINE, getFirstLine, getFirstColumn, deduceSourceLocation, x$, AST, Prototype, y$, superCompile, z$, BlockCompile, wrapNode, z1$, z2$, z3$, z4$, z5$, z6$, BlockReplaceChild, BlockRemoveChild, z7$, AssignReplaceChild, z8$, z9$, k, NodeType, ref$, v, assertions, assertNodes, Compiler, toString$ = {}.toString, slice$ = [].slice, arrayFrom$ = Array.from || function(x){return slice$.call(x);};
  unifiedReplaceChild = function(childToReplace){
    var nodes, res$, i$, to$, ref$, len$, name, child, idx, j$, len1$, node;
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    nodes = res$;
    for (i$ = 0, len$ = (ref$ = this.children).length; i$ < len$; ++i$) {
      name = ref$[i$];
      if (child = this[name]) {
        if (child === childToReplace) {
          if (nodes.length > 1) {
            throw Error("Trying to insert multiple nodes at " + this[type] + "." + name + " where only one is allowed");
          }
          child[parent] = null;
          this[name] = nodes[0];
          nodes[0][parent] = this;
          return child;
        }
        if ('Array' === toString$.call(child).slice(8, -1)) {
          if (-1 !== (idx = child.indexOf(childToReplace))) {
            child.splice.apply(child, [idx, 1].concat(arrayFrom$(nodes)));
            child[parent] = null;
            for (j$ = 0, len1$ = nodes.length; j$ < len1$; ++j$) {
              node = nodes[j$];
              node[parent] = this;
            }
            return child;
          }
        }
      }
    }
    throw Error("Trying to replace node witch is not child of current node");
  };
  unifiedRemoveChild = function(childToReplace){
    var i$, ref$, len$, name, child, idx;
    for (i$ = 0, len$ = (ref$ = this.children).length; i$ < len$; ++i$) {
      name = ref$[i$];
      if (child = this[name]) {
        if (child === childToReplace) {
          child[parent] = null;
          this[name] = null;
          return child;
        }
        if ('Array' === toString$.call(child).slice(8, -1)) {
          if (-1 !== (idx = child.indexOf(childToReplace))) {
            child.splice(idx, 1);
            child[parent] = null;
            return child;
          }
        }
      }
    }
    throw Error("Trying to replace node witch is not child of current node");
  };
  MAX_LINE = 999999;
  getFirstLine = function(node){
    var first_line, walk;
    if (node.first_line != null) {
      return node.first_line;
    } else {
      first_line = MAX_LINE;
      walk = function(node){
        var ref$;
        if (node.first_line != null) {
          first_line = first_line < (ref$ = node.first_line) ? first_line : ref$;
        }
      };
      node.traverseChildren(walk, true);
      return first_line;
    }
  };
  getFirstColumn = function(node){
    var first_line, first_column, walk;
    if (node.first_column != null) {
      return node.first_column;
    } else {
      first_line = node.first_line;
      first_column = MAX_LINE;
      walk = function(node){
        var ref$;
        if (node.first_line === first_line && node.first_column != null) {
          first_column = first_column < (ref$ = node.first_column) ? first_column : ref$;
        }
      };
      node.traverseChildren(walk, true);
      return first_column;
    }
  };
  deduceSourceLocation = function(node){
    if (node.first_line == null) {
      node.first_line = getFirstLine(node);
      if (node.first_line === MAX_LINE) {
        if (node[parent]) {
          node.first_line = getFirstLine(node[parent]);
        }
      }
      node.line = node.first_line;
      console.log('missing-line', node[type], node.first_line);
    }
    if (node.first_column == null) {
      node.first_column = getFirstColumn(node);
      if (node.first_column === MAX_LINE) {
        if (node[parent]) {
          node.first_column = getFirstColumn(node[parent]);
        }
      }
      node.column = node.first_column;
      console.log('missing-column', node[type], node.first_column);
    }
  };
  x$ = AST = ObjectNode[copy]().properties;
  x$[asNode].name = 'ast.livescript';
  Prototype = Symbol('Prototype');
  y$ = superCompile = JsNode[copy]();
  y$.name = 'SuperCompile';
  y$.jsFunction = function(){
    return this[Prototype].compileRoot.apply(this, arguments);
  };
  z$ = BlockCompile = SeriesNode[copy]();
  z$.name = 'compile.Block';
  z$.append(superCompile[copy]());
  wrapNode = function(mapper){
    var wrapped, i$, own$ = {}.hasOwnProperty;
    wrapped = function(){
      return mapper.apply(this, arguments);
    };
    wrapped.node = mapper;
    for (i$ in mapper) if (own$.call(mapper, i$)) {
      (fn$.call(this, i$, mapper[i$]));
    }
    return wrapped;
    function fn$(k, v){
      if (!wrapped[k]) {
        Object.defineProperty(wrapped, k, {
          enumerable: true,
          configurable: false,
          get: function(){
            return this.node[k];
          },
          set: function(it){
            return this.node[k] = it;
          }
        });
      }
    }
  };
  z1$ = AST.Block = ObjectNode[copy]().properties;
  z1$[asNode].name = 'Block.ast.livescript';
  z2$ = AST.Assign = ObjectNode[copy]().properties;
  z2$[asNode].name = 'Assign.ast.livescript';
  z3$ = AST.Call = ObjectNode[copy]().properties;
  z3$[asNode].name = 'Call.ast.livescript';
  z4$ = AST.Chain = ObjectNode[copy]().properties;
  z4$[asNode].name = 'Chain.ast.livescript';
  z5$ = AST.Yield = ObjectNode[copy]().properties;
  z5$[asNode].name = 'Yield.ast.livescript';
  z6$ = AST.Cascade = ObjectNode[copy]().properties;
  z6$[asNode].name = 'Cascade.ast.livescript';
  assert(AST.Block !== AST.Block[copy]());
  assert(AST.Block !== AST[copy]().Block);
  BlockReplaceChild = JsNode['new'](function(child){
    var nodes, res$, i$, to$, idx, ref$, len$, node;
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    nodes = res$;
    idx = this.lines.indexOf(child);
    if (!(idx > -1)) {
      throw Error("Trying to replace node witch is not child of current node");
    }
    if (!nodes.length) {
      throw Error("Replace called without nodes");
    }
    (ref$ = this.lines).splice.apply(ref$, [idx, 1].concat(arrayFrom$(nodes)));
    for (i$ = 0, len$ = nodes.length; i$ < len$; ++i$) {
      node = nodes[i$];
      node[parent] = this;
    }
    return child;
  });
  BlockRemoveChild = JsNode['new'](function(child){
    var idx;
    idx = this.lines.indexOf(child);
    if (!(idx > -1)) {
      throw Error("Trying to replace node witch is not child of current node");
    }
    this.lines.splice(idx, 1);
    child[parent] = null;
    return child;
  });
  z7$ = AST.Block;
  z7$.Compile = BlockCompile;
  z7$.replaceChild = BlockReplaceChild[js];
  z7$.removeChild = BlockRemoveChild[js];
  AssignReplaceChild = JsNode['new'](function(child){
    var nodes, res$, i$, to$, newNode, x$, y$;
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    nodes = res$;
    if (nodes.length !== 1) {
      throw new Error("Cannot replace child of assign with " + nodes.length + " nodes.");
    }
    newNode = nodes[0];
    if (this.left === child) {
      child[parent] = null;
      x$ = this.left = newNode;
      x$[parent] = this;
      return child;
    } else if (this.right === child) {
      child[parent] = null;
      y$ = this.right = newNode;
      y$[parent] = this;
      return child;
    } else {
      throw new Error("Node is not child of Assign");
    }
  });
  z8$ = AssignReplaceChild;
  z8$.name = 'AssignReplaceChild';
  z9$ = AST.Assign;
  z9$.replaceChild = AssignReplaceChild[js];
  AST.Call[asNode].importEnumerable({
    replaceChild: unifiedReplaceChild
  });
  AST.Yield[asNode].importEnumerable({
    replaceChild: unifiedReplaceChild
  });
  AST.Chain[asNode].importEnumerable({
    replaceChild: unifiedReplaceChild,
    removeChild: unifiedRemoveChild
  });
  AST.Cascade[asNode].importEnumerable({
    replaceChild: AST.Chain.replaceChild
  });
  for (k in AST) {
    NodeType = AST[k];
    for (k in ref$ = {
      getChildren: Node.getChildren,
      replaceWith: Node.replaceWith,
      toSourceNode: Node.toSourceNode
    }) {
      v = ref$[k];
      NodeType[k] == null && (NodeType[k] = JsNode['new'](v)[js]);
    }
  }
  assertions = SeriesNode[copy]();
  assertNodes = JsNode['new'](function(it){
    var walk, this$ = this;
    assertions.exec(it, null, 'root');
    walk = function(node, parentNode, name, index){
      assertions.apply(this$, arguments);
    };
    it.traverseChildren(walk);
  });
  module.exports = Compiler = Object.create(ObjectNode);
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  Compiler.lexer = Object.create(null);
  Compiler.init = function(arg$){
    var lexer, name, ref$, Type, ref1$, k, ref2$, v, ref3$, x$, y$;
    this.livescript = arg$.livescript, lexer = arg$.lexer;
    if (lexer) {
      this.livescript.lexer = lexer;
    }
    for (name in ref$ = this.livescript.ast) {
      Type = ref$[name];
      if (Type != null && ((ref1$ = Type.prototype) != null && ref1$.traverseChildren)) {
        for (k in ref2$ = {
          getChildren: Node.getChildren,
          replaceWith: Node.replaceWith,
          toSourceNode: Node.toSourceNode
        }) {
          v = ref2$[k];
          (ref3$ = Type.prototype)[k] == null && (ref3$[k] = v);
        }
      }
    }
    this.lexer = Lexer.create({
      livescript: this.livescript
    });
    this.ast = AST[copy]();
    assert(this.ast.Block !== AST.Block);
    this.expand = ExpandNode[copy]();
    x$ = this.postprocessAst = SeriesNode[copy]();
    x$.name = 'postprocessAst';
    x$['this'] = this;
    y$ = this.postprocessGeneratedCode = SeriesNode[copy]();
    y$.name = 'postprocessGeneratedCode';
    y$['this'] = this;
    y$.append(validateSourceNode);
  };
  Compiler.nodesNames = ['ast', 'lexer', 'expand', 'postprocessAst', 'postprocessGeneratedCode'];
  Compiler.install = function(livescript){
    livescript == null && (livescript = this.livescript);
    this.livescript.compile = bind$(this, 'compile');
  };
  Compiler.create = function(){
    var x$;
    x$ = Object.create(this);
    x$.init.apply(x$, arguments);
    return x$;
  };
  Compiler.copy = function(){
    var x$, i$, ref$, len$, name;
    x$ = Object.create(this);
    x$.nodesNames = Array.from(x$.nodesNames);
    for (i$ = 0, len$ = (ref$ = x$.nodesNames).length; i$ < len$; ++i$) {
      name = ref$[i$];
      if (!x$[name][copy]) {
        throw Error("Compiler." + name + " doesn't have copy method");
      }
      x$[name] = x$[name][copy]();
    }
    return x$;
  };
  Compiler.convertAst = function(astRoot, options){
    var x$, walk, this$ = this;
    x$ = import$(astRoot, this.ast.Block);
    x$[Prototype] = Object.getPrototypeOf(x$);
    x$[type] = this.ast.Block[type];
    walk = function(node, parentNode, name, index){
      var x$, k, ref$, v, ref1$, NodeType;
      x$ = import$(node, NodeType);
      x$[type] = node.constructor.name;
      x$[parent] = parentNode;
      x$.filename = options.filename;
      x$[Prototype] = Object.getPrototypeOf(x$);
      for (k in ref$ = {
        getChildren: Node.getChildren,
        replaceWith: Node.replaceWith,
        toSourceNode: Node.toSourceNode
      }) {
        v = ref$[k];
        (ref1$ = x$[Prototype])[k] == null && (ref1$[k] = v);
      }
      (ref$ = x$[Prototype]).replaceChild == null && (ref$.replaceChild = unifiedReplaceChild);
      if (NodeType = this$.ast[node.constructor.name]) {
        import$(node, NodeType);
      }
    };
    astRoot.traverseChildren(walk, true);
    return astRoot;
  };
  Compiler.generateAst = function(code, options){
    var x$;
    x$ = this.convertAst(this.livescript.ast(this.lexer.lex.exec(code)), options);
    x$.filename = options.filename;
    this.expand.exec(x$);
    assertNodes.exec(x$);
    this.postprocessAst.exec(x$);
    return x$;
  };
  Compiler.fixNode = function(node, filename){
    var i$, ref$, len$, child;
    assert(filename);
    if ('String' !== toString$.call(node).slice(8, -1)) {
      if (node.line < 0) {
        console.log('incorrect', {
          line: node.line,
          column: node.column
        });
      }
      if (!node.source) {
        node.source = filename;
      }
      for (i$ = 0, len$ = (ref$ = node.children).length; i$ < len$; ++i$) {
        child = ref$[i$];
        this.fixSourceMap(child, filename);
      }
    }
  };
  Compiler.fixSourceMap = function(node, filename){
    var i$, len$, n;
    assert(filename);
    if ('Array' === toString$.call(node).slice(8, -1)) {
      for (i$ = 0, len$ = node.length; i$ < len$; ++i$) {
        n = node[i$];
        this.fixNode(n, filename);
      }
    } else {
      this.fixNode(node, filename);
    }
  };
  Compiler.fixAstSourceMap = function(ast, filename){
    var fix, i$, ref$, len$, e;
    assert(filename);
    fix = function(it){
      it.filename = filename;
      deduceSourceLocation(it);
    };
    for (i$ = 0, len$ = (ref$ = ast.exports || (ast.exports = [])).length; i$ < len$; ++i$) {
      e = ref$[i$];
      fix(e);
    }
    for (i$ = 0, len$ = (ref$ = ast.imports || (ast.imports = [])).length; i$ < len$; ++i$) {
      e = ref$[i$];
      fix(e);
    }
    ast.traverseChildren(fix, true);
  };
  Compiler.addSourceMapUrl = function(arg$){
    var result, code, options, filename, outputFilename, ref$, mapPath;
    result = arg$.result, code = arg$.code, options = arg$.options;
    filename = options.filename, outputFilename = options.outputFilename;
    if (options.map === 'embedded') {
      result.map.setSourceContent(filename, code);
    }
    if ((ref$ = options.map) === 'linked' || ref$ === 'debug') {
      mapPath = path.basename(outputFilename) + ".map";
      result.code += "\n//# sourceMappingURL=" + mapPath + "\n";
    } else {
      result.code += "\n//# sourceMappingURL=data:application/json;base64," + new Buffer(result.map.toString()).toString('base64') + "\n";
    }
  };
  Compiler.compileAst = function(arg$){
    var ast, code, options, output, map, x$, result;
    ast = arg$.ast, code = arg$.code, options = arg$.options;
    if (!options.filename) {
      options.filename = "tmp" + Date.now() + ".ls";
    }
    if (!options.outputFilename) {
      options.outputFilename = options.filename.replace(/\.ls$/, '.js');
    }
    output = SourceNode.fromSourceNode(ast.Compile.call(ast, options));
    output.setFile(options.filename);
    this.fixSourceMap(output, options.filename);
    this.postprocessGeneratedCode.exec(output);
    if ((map = options.map) && map !== 'none') {
      x$ = result = output.toStringWithSourceMap();
      x$.ast = ast;
      this.addSourceMapUrl({
        result: result,
        code: code,
        options: options
      });
      return result;
    } else {
      return output.toString();
    }
  };
  Compiler.compile = function(code, options){
    var ast;
    options == null && (options = {});
    if (!options.filename) {
      options.filename = "tmp" + Date.now() + ".ls";
    }
    if (!options.outputFilename) {
      options.outputFilename = options.filename.replace(/\.ls$/, '.js');
    }
    ast = this.generateAst(code, options);
    return this.compileAst({
      ast: ast,
      code: code,
      options: options
    });
  };
  function bind$(obj, key, target){
    return function(){ return (target || obj)[key].apply(obj, arguments) };
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

//# sourceMappingURL=Compiler.js.map
