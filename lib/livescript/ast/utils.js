var { parent, type } = require('./symbols');
(function(){
  var copySourceLocation;
  exports.copySourceLocation = copySourceLocation = function(source, target){
    var first_line, first_column, last_line, last_column, line, column, filename;
    if (target.line != null) {
      return;
    }
    first_line = source.first_line, first_column = source.first_column, last_line = source.last_line, last_column = source.last_column, line = source.line, column = source.column, filename = source.filename;
    target.first_line = first_line;
    target.first_column = first_column;
    target.last_line = last_line;
    target.last_column = last_column;
    target.line = line;
    target.column = column;
    target.filename = filename;
  };
}).call(this);

//# sourceMappingURL=utils.js.map
