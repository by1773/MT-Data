var each = require("../each.js");
var contains = require("./contains.js");

var uniq = function uniq(arr) {
  var resultArr = [];
  each(arr, function (item) {
    if (!contains(resultArr, item)) {
      resultArr.push(item);
    }
  });
  return resultArr;
};

module.exports = uniq;