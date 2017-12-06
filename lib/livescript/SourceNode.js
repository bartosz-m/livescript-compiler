var sourceMap = (require('source-map')['__default__'] || require('source-map'));
var { asNode } = require('js-nodes/symbols');
(function(){
  var Super, originalAdd, SourceNode;
  Super = Symbol('Super');
  originalAdd = sourceMap.SourceNode.prototype.add;
  sourceMap.SourceNode.prototype.add = function(aChunk){
    if (aChunk[asNode]) {
      return originalAdd.call(this, aChunk + "");
    } else {
      return originalAdd.apply(this, arguments);
    }
  };
  module.exports = SourceNode = (function(superclass){
    var prototype = extend$((import$(SourceNode, superclass).displayName = 'SourceNode', SourceNode), superclass).prototype, constructor = SourceNode;
    SourceNode.prototype[Super] = sourceMap.SourceNode.prototype;
    function SourceNode(){
      SourceNode.superclass.apply(this, arguments);
    }
    SourceNode.prototype.setFile = function(filename){
      var i$, ref$, len$, child, results$ = [];
      this.source = filename;
      for (i$ = 0, len$ = (ref$ = this.children).length; i$ < len$; ++i$) {
        child = ref$[i$];
        if (child instanceof sourceMap.SourceNode) {
          results$.push(child.setFile(filename));
        }
      }
      return results$;
    };
    SourceNode.fromSourceNode = function(it){
      return import$(Object.create(it), this.prototype);
    };
    return SourceNode;
  }(sourceMap.SourceNode));
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  function extend$(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

//# sourceMappingURL=SourceNode.js.map
