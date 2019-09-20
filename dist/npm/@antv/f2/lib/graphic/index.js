var G = {
  Canvas: require("./canvas.js"),
  Group: require("./group.js"),
  Shape: require("./shape.js"),
  Matrix: require("./util/matrix.js"),
  Vector2: require("./util/vector2.js")
};

require("./shape/rect.js");

require("./shape/circle.js");

require("./shape/line.js");

require("./shape/polygon.js");

require("./shape/polyline.js");

require("./shape/arc.js");

require("./shape/sector.js");

require("./shape/text.js");

require("./shape/custom.js");

module.exports = G;