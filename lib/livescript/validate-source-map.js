var sourcemapValidator = (require('sourcemap-validator')['__default__'] || require('sourcemap-validator'));
var { SourceMapConsumer } = require('source-map');
(function(){
  var validateSourceMap;
  module.exports = validateSourceMap = function(arg$){
    var ast, code, map, errors, e, validate, consumer;
    ast = arg$.ast, code = arg$.code, map = arg$.map;
    errors = [];
    try {
      sourcemapValidator(code, map.toString());
    } catch (e$) {
      e = e$;
      console.log(e);
    }
    validate = function(mapping){
      var errors;
      errors = [];
      if (mapping.generatedLine < 1 || mapping.generatedColumn < 0) {
        errors.push({
          message: "invalid mapping",
          mapping: mapping,
          filename: ast.filename
        });
      }
      if (mapping.originalLine == null) {
        errors.push({
          message: "missing original line",
          mapping: mapping,
          filename: ast.filename
        });
      }
      if (mapping.originalColumn == null) {
        errors.push({
          message: "missing column",
          mapping: mapping,
          filename: ast.filename
        });
      }
      return errors;
    };
    consumer = new SourceMapConsumer(map.toString());
    consumer.eachMapping(validate);
    if (errors.length) {
      console.log(errors);
    }
    return errors;
  };
  Object.defineProperty(module.exports, '__default__', {enumerable:false, value: module.exports});
}).call(this);

//# sourceMappingURL=validate-source-map.js.map
