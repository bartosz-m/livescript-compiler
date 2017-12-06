(function(){
  var Plugin;
  module.exports = Plugin = Object.create(null);
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
  Plugin.getDefaultCompiler = function(){
    var livescript, lexer, Compiler, plugableCompiler, compiler;
    livescript = require('livescript');
    lexer = require('livescript/lib/lexer');
    Compiler = require('./Compiler');
    plugableCompiler = Symbol['for']('plugable-compiler.livescript');
    if (!(compiler = livescript[plugableCompiler])) {
      livescript[plugableCompiler] = compiler = Compiler.create({
        livescript: livescript,
        lexer: lexer
      });
      compiler.install();
    }
    return compiler;
  };
  Plugin.install = function(livescript, config){
    var mySymbol, ref$;
    this.livescript = livescript;
    if (!this.livescript) {
      this.livescript = this.getDefaultCompiler();
    }
    import$(this.config, config);
    mySymbol = Symbol['for'](this.name + ".plugin.livescript");
    if (!this.livescript[mySymbol]) {
      this.enable();
      this.livescript[mySymbol] = true;
      ((ref$ = this.livescript).plugins || (ref$.plugins = [])).push(this);
    }
  };
  Plugin.enable = function(){
    throw Error("Plugin must override 'enable' method");
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);

//# sourceMappingURL=Plugin.js.map
