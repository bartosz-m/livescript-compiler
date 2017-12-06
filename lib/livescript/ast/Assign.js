var { create, init } = require('../../core/symbols');
var Node = (require('./Node')['__default__'] || require('./Node'));
var { parent, type } = require('./symbols');
(function(){
  var Assign;
  module.exports = Assign = Object.create(Node);
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  Assign[type] = 'SmartAssign';
  Assign[init] = function(arg$){
    this.left = arg$.left, this.right = arg$.right;
    this.left[parent] = this;
    return this.right[parent] = this;
  };
  Assign.traverseChildren = function(visitor, crossScopeBoundary){
    visitor(this.left);
    return visitor(this.right);
  };
  Assign.removeChild = function(child){
    if (this.left === child) {
      return this.left = null;
    } else if (this.right === child) {
      return this.right = null;
    } else {
      throw Error("Intertarnal compiler error");
    }
  };
  Assign.replaceChild = function(child, node){
    if (this.left === child) {
      return this.left = node;
    } else if (this.right === child) {
      return this.right = node;
    } else {
      throw Error("Intertarnal compiler error");
    }
  };
  Assign.compile = function(o){
    return this.toSourceNode({
      parts: [this.left.compile(o), " = ", this.right.compile(o)]
    });
  };
  Assign.terminator = ';';
}).call(this);

//# sourceMappingURL=Assign.js.map
