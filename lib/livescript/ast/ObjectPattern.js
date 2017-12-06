var { create, init } = require('../../core/symbols');
var Node = (require('./Node')['__default__'] || require('./Node'));
var Property = (require('./Property')['__default__'] || require('./Property'));
var { parent, type } = require('./symbols');
var { copySourceLocation } = require('./utils');
(function(){
  var ObjectPattern, slice$ = [].slice, arrayFrom$ = Array.from || function(x){return slice$.call(x);};
  module.exports = ObjectPattern = Object.create(Node);
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  ObjectPattern[type] = 'ObjectPattern.ast.livescript';
  ObjectPattern[init] = function(arg$){
    var i$, ref$, len$, item, pos, x$;
    this.items = arg$.items;
    for (i$ = 0, len$ = (ref$ = this.items).length; i$ < len$; ++i$) {
      item = ref$[i$];
      item[parent] = this;
    }
    for (i$ = 0, len$ = (ref$ = this.items).length; i$ < len$; ++i$) {
      pos = i$;
      item = ref$[i$];
      if (item[type] === 'Prop') {
        x$ = this.items[pos] = Property[create]({
          key: item.key,
          value: item.val
        });
        copySourceLocation(item, x$);
        item = x$;
      }
      item[parent] = this;
    }
  };
  ObjectPattern.traverseChildren = function(visitor, crossScopeBoundary){
    var i$, ref$, len$, i, item, results$ = [];
    for (i$ = 0, len$ = (ref$ = this.items).length; i$ < len$; ++i$) {
      i = i$;
      item = ref$[i$];
      visitor(item, this, 'items', i);
    }
    for (i$ = 0, len$ = (ref$ = this.items).length; i$ < len$; ++i$) {
      item = ref$[i$];
      results$.push(item.traverseChildren(visitor, crossScopeBoundary));
    }
    return results$;
  };
  ObjectPattern.compile = function(o){
    var items, i$, ref$, len$, i;
    items = [];
    for (i$ = 0, len$ = (ref$ = this.items).length; i$ < len$; ++i$) {
      i = ref$[i$];
      items.push(i.compile(o));
      items.push(', ');
    }
    items.pop();
    return this.toSourceNode({
      parts: ["{ "].concat(arrayFrom$(items), [" }"])
    });
  };
  ObjectPattern.terminator = '';
  ObjectPattern.replaceChild = function(child, node){
    var idx;
    if (-1 === (idx = this.items.indexOf(child))) {
      throw Error("Node is not a child of ObjectPattern");
    }
    this.items.splice(idx, 1, node);
    return child;
  };
}).call(this);

//# sourceMappingURL=ObjectPattern.js.map
