var isType = require("./is-type.js");

var isDate = function isDate(value) {
  return isType(value, 'Date');
};

module.exports = isDate;