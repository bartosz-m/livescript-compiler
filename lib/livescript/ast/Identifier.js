var { create, init } = require('../../core/symbols');
var Node = (require('./Node')['__default__'] || require('./Node'));
var { parent, type } = require('./symbols');
(function(){
  var camelize, Identifier, this$ = this;
  camelize = function(it){
    return it.replace(/-[a-z]/ig, function(it){
      return it.charAt(1).toUpperCase();
    });
  };
  module.exports = Identifier = Object.create(Node);
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  Identifier[type] = 'Identifier';
  Identifier[init] = function(arg$){
    this.name = arg$.name;
    if (this.name == null) {
      throw Error("Identifier doesn't have name ");
    }
  };
  Identifier.traverseChildren = function(visitor, crossScopeBoundary){};
  Identifier.compile = function(o){
    if (-1 !== this.name.search(/\./)) {
      throw Error("Incorrect identifier '" + this.name + "'. Identifier cannot have '.' at " + this.line + ":" + this.column + " in " + this.filename);
    }
    return this.toSourceNode({
      parts: [camelize(this.name)]
    });
  };
  Object.defineProperty(Identifier, 'value', {
    get: function(){
      return this.name;
    },
    configurable: true,
    enumerable: true
  });
  Identifier.isEmpty = function(){
    return false;
  };
  Identifier.getDefault = function(){};
  Identifier.isAssignable = function(){
    return true;
  };
  Identifier.varName = function(){
    return this.name;
  };
  Identifier.unwrap = function(){
    return this;
  };
  Identifier.compileNode = function(){
    return this.compile.apply(this, arguments);
  };
}).call(this);

//# sourceMappingURL=Identifier.js.map
