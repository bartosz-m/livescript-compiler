var assert = (require('assert')['__default__'] || require('assert'));
var SourceNode = (require('../SourceNode')['__default__'] || require('../SourceNode'));
var { Creatable } = require('../../core/components');
var { create, init } = require('../../core/symbols');
var { importProperties } = require('../../composition');
var { ObjectNode, symbols : { copy, asNode, js } } = require('js-nodes');
var { parent, type } = require('./symbols');
(function(){
  var debugName, x$, NodeNode, Node, ref$, toString$ = {}.toString, slice$ = [].slice, arrayFrom$ = Array.from || function(x){return slice$.call(x);};
  class InternalCompilerError extends Error {
      constructor(node,message) {
          super();
          this.init(node,message);
      }
  }
  InternalCompilerError.prototype.init = function(node, message){
    return this.message = "InternalCompilerError: " + message + " in " + node.filename + ":" + node.line + ":" + node.column;
  };
  debugName = function(it){
    var that;
    if (that = it[type]) {
      return "[" + that + "]";
    } else {
      return "livescript.ast." + it.constructor.name;
    }
  };
  x$ = NodeNode = ObjectNode[copy]();
  x$.name = 'Node.ast';
  NodeNode.importEnumerable(Creatable);
  module.exports = Node = NodeNode.properties;
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  assert(Node[create], "node.create");
  assert.equal('Function', toString$.call(Node[create]).slice(8, -1));
  assert.equal(Node[asNode], NodeNode);
  NodeNode.importEnumerable((ref$ = {}, ref$[Symbol.hasInstance] = function(){
    return Object.isPrototypeOf.apply(this, arguments);
  }, ref$[type] = 'Node', ref$[init] = function(){}, ref$.isStatement = function(){
    return false;
  }, ref$.terminator = '', ref$.childrenNames = [], ref$.unfoldSoak = function(){}, ref$.unparen = function(){
    return this;
  }, ref$.remove = function(){
    var Type;
    if (!this[parent]) {
      throw new InternalCompilerError(this, this[type] + " doesn't have parent");
    }
    if (!this[parent].removeChild) {
      Type = this[parent][type];
      throw Error("You need to implement method " + Type + "::remove-child youreself");
    }
    return this[parent].removeChild(this);
  }, ref$.ripName = function(it){
    this.name = it;
  }, ref$.expandSlice = function(){
    return this;
  }, ref$.unwrap = function(){
    return this;
  }, ref$.rewriteShorthand = function(o, assign){}, ref$.eachChild = function(fn){
    var i$, ref$, len$, name, child;
    for (i$ = 0, len$ = (ref$ = this.childrenNames).length; i$ < len$; ++i$) {
      name = ref$[i$];
      if (child = this[name]) {
        fn(child);
      }
    }
  }, ref$.getChildren = function(){
    var children;
    children = [];
    this.eachChild(function(it){
      children.push(it);
    });
    return children;
  }, ref$.replaceChild = function(){
    var type;
    if (type = this[type]) {
      throw Error("You need to implement method " + type + "::replace-child youreself");
    } else {
      console.log(this);
      throw Error("You need to implement method ::replace-child youreself");
    }
  }, ref$.replaceWith = function(){
    var nodes, res$, i$, to$, len$, node, ref$;
    res$ = [];
    for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    nodes = res$;
    if (!this[parent]) {
      throw new InternalCompilerError(this, this[type] + " doesn't have parent");
    }
    if (!this[parent].replaceChild) {
      throw new InternalCompilerError(this, this[parent][type] + " doesn't imlement replace-child method");
    }
    for (i$ = 0, len$ = nodes.length; i$ < len$; ++i$) {
      node = nodes[i$];
      node[parent] = this[parent];
    }
    return (ref$ = this[parent]).replaceChild.apply(ref$, [this].concat(arrayFrom$(nodes)));
  }, ref$.compile = function(options, level){
    var o, node, code, that, i$, len$, tmp;
    o = import$({}, options);
    if (level != null) {
      o.level = level;
    }
    node = this.unfoldSoak(o) || this;
    if (o.level && node.isStatement()) {
      return node.compileClosure(o);
    }
    if (!node.compileNode) {
      throw Error("Unimplemented method compile-node in " + debugName(node));
    }
    code = (node.tab = o.indent, node).compileNode(o);
    if (that = node.temps) {
      for (i$ = 0, len$ = that.length; i$ < len$; ++i$) {
        tmp = that[i$];
        o.scope.free(tmp);
      }
    }
    return code;
  }, ref$.toSourceNode = function(arg$){
    var parts, ref$, result, e;
    parts = (ref$ = arg$.parts) != null
      ? ref$
      : [];
    try {
      parts = parts.map(function(it){
        if ('String' === toString$.call(it).slice(8, -1)) {
          return it + "";
        } else {
          return it;
        }
      });
      result = new SourceNode(this.line, this.column, this.filename, parts);
      result.displayName = this[type];
      return result;
    } catch (e$) {
      e = e$;
      console.dir(parts);
      throw e;
    }
  }, ref$));
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

//# sourceMappingURL=Node.js.map
