var { create, init } = require('../../core/symbols');
var Node = (require('./Node')['__default__'] || require('./Node'));
var { parent, type } = require('./symbols');
(function(){
  var Literal;
  module.exports = Literal = Object.create(Node);
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  Literal[type] = 'Literal.ast.LiveScript';
  Literal[init] = function(arg$){
    this.value = arg$.value;
  };
  Literal.traverseChildren = function(visitor, crossScopeBoundary){};
  Literal.compile = function(o){
    return this.toSourceNode({
      parts: [this.value]
    });
  };
}).call(this);

//# sourceMappingURL=Literal.js.map
