var Core = {};

var Global = require("./global.js");

Core.Global = Global;
Core.version = Global.version;
Core.Chart = require("./chart/chart.js");
Core.Shape = require("./geom/shape/shape.js");
Core.G = require("./graphic/index.js");
Core.Util = require("./util/common.js"); // Core.track = function(enable) {
//   Global.trackable = enable;
// };
// require('./track');
// 2018-12-27 关闭打点

Core.track = function () {
  return null;
};

module.exports = Core;