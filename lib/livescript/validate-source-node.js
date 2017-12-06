var { JsNode } = require('js-nodes');
(function(){
  var validateSourceNode, toString$ = {}.toString;
  module.exports = validateSourceNode = JsNode['new'](function(sourceNode){
    var errors, validate;
    errors = [];
    validate = function(node){
      var i$, x$, ref$, len$, n;
      if ('String' !== toString$.call(node).slice(8, -1)) {
        if ('Array' !== toString$.call(node).slice(8, -1)) {
          if (node.source == null) {
            errors.push({
              message: "missing source",
              node: node
            });
          }
          if (node.children.length === 0 && node.toString() !== '') {
            if (node.line == null) {
              errors.push({
                message: "missing file location",
                children: node.children.length,
                node: node,
                code: node.toString()
              });
            } else {
              if (!(node.line >= 1)) {
                errors.push({
                  message: "invalid line",
                  node: node
                });
              }
              if (!(node.column >= 0)) {
                errors.push({
                  message: "invalid column",
                  node: node
                });
              }
            }
          }
          for (i$ = 0, len$ = (ref$ = node.children).length; i$ < len$; ++i$) {
            x$ = ref$[i$];
            validate(x$);
          }
        } else {
          for (i$ = 0, len$ = node.length; i$ < len$; ++i$) {
            n = node[i$];
            validate(n);
          }
        }
      }
    };
    validate(sourceNode);
    return sourceNode;
  });
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
}).call(this);

//# sourceMappingURL=validate-source-node.js.map
