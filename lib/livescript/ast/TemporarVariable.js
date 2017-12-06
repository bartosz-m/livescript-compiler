var { init } = require('../../core/symbols');
var { importProperties } = require('../../composition');
var Creatable = (require('../../core/components/Creatable')['__default__'] || require('../../core/components/Creatable'));
var { parent, type } = require('./symbols');
var Node = (require('./Node')['__default__'] || require('./Node'));
(function(){
  var x$, TemporarVariable;
  module.exports = x$ = TemporarVariable = Object.create(Node);
  importProperties(x$, Creatable);
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  TemporarVariable[type] = 'TemporarVariable';
  TemporarVariable[init] = function(arg$){
    this.name = arg$.name, this.isExport = arg$.isExport, this.isImport = arg$.isImport;
    this._name = this.name;
  };
  TemporarVariable.traverseChildren = function(visitor, crossScopeBoundary){};
  TemporarVariable.compile = function(o){
    var ref$, ref1$;
    if (this.name !== this._name) {
      this.name = this._name;
    }
    this.temporaryName == null && (this.temporaryName = o.scope.temporary(((ref$ = this.name) != null ? ref$[type] : void 8) === 'Key'
      ? this.name.name
      : this.name));
    if (this.isExport || this.isImport) {
      if ((ref1$ = o.scope) != null) {
        ref1$.variables[this.temporaryName + "."] = 'DONT TOUTCH';
      }
    }
    return this.toSourceNode({
      parts: [this.temporaryName]
    });
  };
}).call(this);

//# sourceMappingURL=TemporarVariable.js.map
