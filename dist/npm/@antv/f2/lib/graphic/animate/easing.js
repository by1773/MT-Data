var Easing = {
  linear: function linear(k) {
    return k;
  },
  quadraticIn: function quadraticIn(k) {
    return k * k;
  },
  quadraticOut: function quadraticOut(k) {
    return k * (2 - k);
  },
  quadraticInOut: function quadraticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }

    return -0.5 * (--k * (k - 2) - 1);
  },
  cubicIn: function cubicIn(k) {
    return k * k * k;
  },
  cubicOut: function cubicOut(k) {
    return --k * k * k + 1;
  },
  cubicInOut: function cubicInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }

    return 0.5 * ((k -= 2) * k * k + 2);
  },
  elasticIn: function elasticIn(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;

    if (!p) {
      p = 0.3;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }

    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
  },
  elasticOut: function elasticOut(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;

    if (!p) {
      p = 0.3;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }

    return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
  },
  elasticInOut: function elasticInOut(k) {
    var s;
    var a = 0.1;
    var p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;

    if (!p) {
      p = 0.3;
    }

    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }

    if ((k *= 2) < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    }

    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
  },
  backIn: function backIn(k) {
    var s = 1.70158;
    return k * k * (2.70158 * k - s);
  },
  backOut: function backOut(k) {
    var s = 1.70158;
    return (k = k - 1) * k * (2.70158 * k + s) + 1;
  },
  backInOut: function backInOut(k) {
    var s = 2.5949095;

    if ((k *= 2) < 1) {
      return 0.5 * (k * k * (3.5949095 * k - s));
    }

    return 0.5 * ((k -= 2) * k * (3.5949095 * k + s) + 2);
  },
  bounceIn: function bounceIn(k) {
    return 1 - Easing.bounceOut(1 - k);
  },
  bounceOut: function bounceOut(k) {
    if ((k /= 1) < 0.36363636363636365) {
      return 7.5625 * k * k;
    } else if (k < 0.7272727272727273) {
      return 7.5625 * (k -= 0.5454545454545454) * k + 0.75;
    } else if (k < 0.9090909090909091) {
      return 7.5625 * (k -= 0.8181818181818182) * k + 0.9375;
    }

    return 7.5625 * (k -= 0.9545454545454546) * k + 0.984375;
  },
  bounceInOut: function bounceInOut(k) {
    if (k < 0.5) {
      return Easing.bounceIn(k * 2) * 0.5;
    }

    return Easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }
};
module.exports = Easing;