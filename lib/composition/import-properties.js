(function(){
  var defineProperties, getOwnPropertyDescriptors, importProperties;
  defineProperties = Object.defineProperties, getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
  module.exports = importProperties = function(target){
    var sources, res$, i$, to$, len$, source, descriptor, keys, onlyEnumerable, j$, len1$, k, v;
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    sources = res$;
    for (i$ = 0, len$ = sources.length; i$ < len$; ++i$) {
      source = sources[i$];
      descriptor = getOwnPropertyDescriptors(source);
      keys = Object.keys(descriptor).concat(Object.getOwnPropertySymbols(descriptor));
      res$ = {};
      for (j$ = 0, len1$ = keys.length; j$ < len1$; ++j$) {
        k = keys[j$];
        if ((v = descriptor[k]).enumerable) {
          res$[k] = v;
        }
      }
      onlyEnumerable = res$;
      defineProperties(target, onlyEnumerable);
    }
    return target;
  };
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
}).call(this);

//# sourceMappingURL=import-properties.js.map
