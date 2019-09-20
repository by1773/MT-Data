var Theme = require("./theme.js");

var Util = require("./util/common.js");

var Global = {
  version: '3.4.1',
  scales: {},
  widthRatio: {
    column: 0.5,
    rose: 0.999999,
    multiplePie: 0.75
  },
  lineDash: [4, 4]
};

Global.setTheme = function (theme) {
  Util.deepMix(this, theme);
};

Global.setTheme(Theme);
module.exports = Global;