var assert = (require('assert')['__default__'] || require('assert'));
var { JsNode, SeriesNode, symbols : { copy, asNode, js } } = require('js-nodes');
(function(){
  var x$, OriginalLex, y$, Lex, z$, OriginalTokenize, z1$, Tokenize, Lexer, copyLexer;
  x$ = OriginalLex = JsNode[copy]();
  x$.name = 'original-lex.Lexer';
  x$.jsFunction = function(code, options){
    assert.equal('Lexer', this.name);
    return this.tokenize.call(this, code || '', options || {});
  };
  y$ = Lex = SeriesNode[copy]();
  y$.name = 'lex.Lexer';
  y$.append(OriginalLex);
  z$ = OriginalTokenize = JsNode[copy]();
  z$.jsFunction = function(code, options){
    var ref$;
    assert.equal('Lexer', this.name);
    assert(this.livescript);
    return (ref$ = Object.create(this.livescript.lexer)).tokenize.apply(ref$, arguments);
  };
  z1$ = Tokenize = SeriesNode[copy]();
  z1$.name = 'tokenize.Lexer';
  z1$.append(OriginalTokenize);
  module.exports = Lexer = Object.create(null);
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  Lexer.count = 0;
  Lexer.id = 0;
  Lexer.name = 'Lexer';
  Lexer.nodesNames = ['lex', 'tokenize'];
  Lexer.init = function(arg$){
    var i$, ref$, len$, name, x$;
    this.livescript = arg$.livescript;
    if (!this.livescript.lexer) {
      throw Error("LiveScript implementation is missing lexer");
    }
    this.id = Lexer.count++;
    this.nodesNames = Array.from(this.nodesNames);
    for (i$ = 0, len$ = (ref$ = this.nodesNames).length; i$ < len$; ++i$) {
      name = ref$[i$];
      x$ = this[name] = this[name][copy]();
      x$['this'] = this;
    }
  };
  Lexer.create = function(){
    var x$;
    x$ = Object.create(this);
    x$.init.apply(x$, arguments);
    return x$;
  };
  Lexer.lex = Lex;
  Lexer.tokenize = Tokenize;
  Lexer.copy = function(){
    var x$, result, i$, ref$, len$, name, y$;
    x$ = result = Object.create(this);
    x$.id = Lexer.count++;
    x$.nodesNames = Array.from(x$.nodesNames);
    for (i$ = 0, len$ = (ref$ = x$.nodesNames).length; i$ < len$; ++i$) {
      name = ref$[i$];
      y$ = x$[name] = x$[name][copy]();
      y$['this'] = result;
    }
    return x$;
  };
  Lexer[copy] = function(){
    var x$, result, i$, ref$, len$, name, y$;
    x$ = result = Object.create(this);
    x$.id = Lexer.count++;
    x$.nodesNames = Array.from(x$.nodesNames);
    for (i$ = 0, len$ = (ref$ = x$.nodesNames).length; i$ < len$; ++i$) {
      name = ref$[i$];
      y$ = x$[name] = x$[name][copy]();
      y$['this'] = result;
    }
    return x$;
  };
  Lex['this'] = Lexer;
  Tokenize['this'] = Lexer;
  copyLexer = Lexer.copy();
  assert.equal(copyLexer.name, copyLexer.lex['this'].name);
}).call(this);

//# sourceMappingURL=Lexer.js.map
