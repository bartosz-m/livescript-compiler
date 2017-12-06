var { create, init } = require('../../core/symbols');
var Node = (require('./Node')['__default__'] || require('./Node'));
var { parent, type } = require('./symbols');
(function(){
  var Property;
  module.exports = Property = Object.create(Node);
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  Property[type] = 'Property.ast.LiveScript';
  Property[init] = function(arg$){
    var i$, ref$, len$, name, child;
    this.key = arg$.key, this.value = arg$.value;
    for (i$ = 0, len$ = (ref$ = this.childrenNames).length; i$ < len$; ++i$) {
      name = ref$[i$];
      if (child = this[name]) {
        child[parent] = this;
      }
    }
  };
  Property.childrenNames = ['key', 'value'];
  Property.traverseChildren = function(visitor, crossScopeBoundary){
    if (this.key) {
      visitor(this.key, this, 'key');
      this.key.traverseChildren(visitor, crossScopeBoundary);
    }
    if (this.value) {
      visitor(this.value, this, 'value');
      return this.value.traverseChildren(visitor, crossScopeBoundary);
    }
  };
  Property.compile = function(o){
    if (this.value) {
      if (this.key) {
        return this.toSourceNode({
          parts: [this.key.compile(o), " : ", this.value.compile(o)]
        });
      } else {
        return this.toSourceNode({
          parts: [this.value.compile(o)]
        });
      }
    } else {
      return this.toSourceNode({
        parts: [this.key.compile(o)]
      });
    }
  };
}).call(this);

//# sourceMappingURL=Property.js.map
