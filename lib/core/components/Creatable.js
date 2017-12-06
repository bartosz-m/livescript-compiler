var { create, init } = require('../symbols');
(function(){
  var Creatable, ref$;
  module.exports = Creatable = (ref$ = {}, ref$[Symbol.hasInstance] = function(){
    return Object.isPrototypeOf.apply(this, arguments);
  }, ref$[create] = function(){
    var x$;
    x$ = Object.create(this);
    x$[init].apply(x$, arguments);
    return x$;
  }, ref$);
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
}).call(this);

//# sourceMappingURL=Creatable.js.map
