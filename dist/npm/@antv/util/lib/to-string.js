var isNil = require("./type/is-nil.js");

function toString(value) {
  if (isNil(value)) return '';
  return value.toString();
}

module.exports = toString;