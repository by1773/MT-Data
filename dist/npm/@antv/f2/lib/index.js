/**
 * Default, without interactins
 */
var F2 = require("./core.js");

require("./geom//index.js");

require("./geom/adjust//index.js");

require("./coord/polar.js"); // polar coordinate


require("./component/axis/circle.js"); // the axis for polar coordinate


require("./scale/time-cat.js"); // timeCat scale


require("./component/guide/arc.js");

require("./component/guide/html.js");

require("./component/guide/line.js");

require("./component/guide/rect.js");

require("./component/guide/text.js");

require("./component/guide/tag.js");

require("./component/guide/point.js");

var Tooltip = require("./plugin/tooltip.js");

var Guide = require("./plugin/guide.js");

var Legend = require("./plugin/legend.js");

var Animation = require("./animation/detail.js");

F2.Animate = require("./animation/animate.js"); // register plugins

F2.Chart.plugins.register([Tooltip, Legend, Guide, Animation]);
module.exports = F2;