var isType = require("./is-type.js");

var isString = function isString(str) {
  return isType(str, 'String');
};

module.exports = isString;