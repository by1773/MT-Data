var toString = require("../to-string.js");

var lowerFirst = function lowerFirst(value) {
  var str = toString(value);
  return str.charAt(0).toLowerCase() + str.substring(1);
};

module.exports = lowerFirst;