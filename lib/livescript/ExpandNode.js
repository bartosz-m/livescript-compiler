var { copy, asNode, js } = require('js-nodes/symbols');
var { parent, type } = require('./ast/symbols');
var { copySourceLocation } = require('./ast/utils');
(function(){
  var asArray, flatten, ExpandNode, toString$ = {}.toString;
  asArray = function(it){
    if (Array.isArray(it)) {
      return it;
    } else {
      return [it];
    }
  };
  flatten = function(arr){
    var result;
    result = [];
    arr.forEach(function(it){
      if (Array.isArray(it)) {
        return result.push.apply(result, it);
      } else {
        return result.push(it);
      }
    });
    return result;
  };
  module.exports = ExpandNode = Object.create(null);
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  ExpandNode.name = 'Expand';
  ExpandNode.append = function(rule){
    var ref$;
    if (!rule[copy]) {
      throw Error("Creating node " + ((ref$ = rule.name) != null ? ref$ : '') + " without copy method is realy bad practice");
    }
    if (!rule.name) {
      throw new Error("Adding rule without a name is realy bad practice");
    }
    this.rules.push(rule);
  };
  ExpandNode.remove = function(ruleOrFilter){
    var idx, rule;
    idx = 'Function' === toString$.call(ruleOrFilter).slice(8, -1)
      ? this.rules.findIndex(ruleOrFilter)
      : this.rules.indexOf(ruleOrFilter);
    if (idx !== -1) {
      rule = this.rules[idx];
      this.rules.splice(idx, 1);
      return rule;
    } else {
      throw Error("Cannot remove rule - there is none matching");
    }
  };
  ExpandNode.rules = [];
  ExpandNode.exec = function(astRoot){
    var changed, toProcess, processing, i$, len$, node, j$, ref$, len1$, rule, mapped, newNodes, k$, len2$, n, e;
    changed = false;
    toProcess = [astRoot];
    while (toProcess.length) {
      changed = false;
      processing = toProcess;
      toProcess = [];
      for (i$ = 0, len$ = processing.length; i$ < len$; ++i$) {
        node = processing[i$];
        for (j$ = 0, len1$ = (ref$ = this.rules).length; j$ < len1$; ++j$) {
          rule = ref$[j$];
          if (mapped = rule.exec(node)) {
            try {
              changed = true;
              newNodes = asArray(mapped);
              if (!newNodes[0]) {
                console.log('empty', rule);
              }
              for (k$ = 0, len2$ = newNodes.length; k$ < len2$; ++k$) {
                n = newNodes[k$];
                copySourceLocation(node, n);
              }
              node.replaceWith.apply(node, newNodes);
              break;
            } catch (e$) {
              e = e$;
              e.message += "\n at node " + this.name + " applyin " + rule.name;
              console.log(e);
              console.log(astRoot);
              throw e;
            }
          }
        }
      }
      if (changed) {
        toProcess.push(astRoot);
      } else {
        toProcess.push.apply(toProcess, flatten(processing.map(fn$)));
      }
    }
    function fn$(it){
      return typeof it.getChildren == 'function' ? it.getChildren() : void 8;
    }
  };
  ExpandNode[copy] = function(){
    var x$, this$ = this;
    x$ = Object.create(this);
    x$.rules = this.rules.map(function(it){
      return it[copy]();
    });
    return x$;
  };
}).call(this);

//# sourceMappingURL=ExpandNode.js.map
