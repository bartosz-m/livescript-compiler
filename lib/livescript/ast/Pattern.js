var { create, init } = require('../../core/symbols');
var Node = (require('./Node')['__default__'] || require('./Node'));
var ObjectPattern = (require('./ObjectPattern')['__default__'] || require('./ObjectPattern'));
var Property = (require('./Property')['__default__'] || require('./Property'));
var { parent, type } = require('./symbols');
var { copySourceLocation } = require('./utils');
(function(){
  var getIdentifier, Pattern, slice$ = [].slice, arrayFrom$ = Array.from || function(x){return slice$.call(x);};
  getIdentifier = function(it){
    return it.value || it.name;
  };
  module.exports = Pattern = Object.create(Node);
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  Pattern[type] = 'Pattern';
  Pattern[init] = function(arg$){
    var i$, ref$, len$, pos, item, x$, ref1$, value, y$;
    this.items = arg$.items;
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
    for (i$ = 0, len$ = (ref$ = this.items).length; i$ < len$; ++i$) {
      item = ref$[i$];
      if (((ref1$ = item.value) != null ? ref1$[type] : void 8) === 'Obj') {
        value = item.value;
        item.value = ObjectPattern[create]({
          items: value.items
        });
        y$ = item.value[parent] = item;
        copySourceLocation(value, y$);
      }
    }
  };
  Pattern.traverseChildren = function(visitor, crossScopeBoundary){
    var i$, ref$, len$, i, item;
    for (i$ = 0, len$ = (ref$ = this.items).length; i$ < len$; ++i$) {
      i = i$;
      item = ref$[i$];
      visitor(item, this, 'items', i);
    }
    for (i$ = 0, len$ = (ref$ = this.items).length; i$ < len$; ++i$) {
      item = ref$[i$];
      item.traverseChildren(visitor, crossScopeBoundary);
    }
  };
  Pattern.compile = function(o){
    var items;
    items = this.items.map(function(it){
      if (it.compile) {
        return it.compile(o);
      } else {
        if (it.key) {
          if (it.val) {
            return getIdentifier(it.key) + " : " + it.val.value;
          } else {
            return getIdentifier(it.key) + "";
          }
        } else {
          return it.val.compile(o) + "";
        }
      }
    });
    items = items.join(', ');
    return this.toSourceNode({
      parts: ["{ "].concat(arrayFrom$(items), [" }"])
    });
  };
  Pattern.terminator = '';
}).call(this);

//# sourceMappingURL=Pattern.js.map
