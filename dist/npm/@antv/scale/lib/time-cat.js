function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;subClass.__proto__ = superClass;
}

/**
 * @fileOverview 时间数据作为分类类型
 * @author dxq613@gmail.com
 */
var Base = require("./base.js");

var Category = require("./category.js");

var fecha = require("../../../fecha/fecha.js");

var catAuto = require("./auto/cat.js");

var TimeUtil = require("./time-util.js");

var each = require("../../util/lib/each.js");

var isNumber = require("../../util/lib/type/is-number.js");

var isObject = require("../../util/lib/type/is-object.js");

var isString = require("../../util/lib/type/is-string.js");
/**
 * 度量的构造函数
 * @class Scale.TimeCategory
 */

var TimeCategory =
/*#__PURE__*/
function (_Category) {
  _inheritsLoose(TimeCategory, _Category);

  function TimeCategory() {
    return _Category.apply(this, arguments) || this;
  }

  var _proto = TimeCategory.prototype;

  _proto._initDefaultCfg = function _initDefaultCfg() {
    _Category.prototype._initDefaultCfg.call(this);

    this.type = 'timeCat';
    /**
     * 是否需要排序，默认进行排序
     * @type {Boolean}
     */

    this.sortable = true;
    this.tickCount = 5;
    /**
     * 时间格式化
     * @type {String}
     */

    this.mask = 'YYYY-MM-DD';
  };

  _proto.init = function init() {
    var self = this;
    var values = this.values; // 针对时间分类类型，会将时间统一转换为时间戳

    each(values, function (v, i) {
      values[i] = self._toTimeStamp(v);
    });

    if (this.sortable) {
      // 允许排序
      values.sort(function (v1, v2) {
        return v1 - v2;
      });
    }

    if (!self.ticks) {
      self.ticks = this.calculateTicks();
    }
  }
  /**
   * 计算 ticks
   * @return {array} 返回 ticks 数组
   */
  ;

  _proto.calculateTicks = function calculateTicks() {
    var self = this;
    var count = self.tickCount;
    var ticks;

    if (count) {
      var temp = catAuto({
        maxCount: count,
        data: self.values,
        isRounding: self.isRounding
      });
      ticks = temp.ticks;
    } else {
      ticks = self.values;
    }

    return ticks;
  }
  /**
   * @override
   */
  ;

  _proto.translate = function translate(value) {
    value = this._toTimeStamp(value);
    var index = this.values.indexOf(value);

    if (index === -1) {
      if (isNumber(value) && value < this.values.length) {
        index = value;
      } else {
        index = NaN;
      }
    }

    return index;
  }
  /**
   * @override
   */
  ;

  _proto.scale = function scale(value) {
    var rangeMin = this.rangeMin();
    var rangeMax = this.rangeMax();
    var index = this.translate(value);
    var percent;

    if (this.values.length === 1 || isNaN(index)) {
      // is index is NAN should not be set as 0
      percent = index;
    } else if (index > -1) {
      percent = index / (this.values.length - 1);
    } else {
      percent = 0;
    }

    return rangeMin + percent * (rangeMax - rangeMin);
  }
  /**
   * @override
   */
  ;

  _proto.getText = function getText(value) {
    var result = '';
    var index = this.translate(value);

    if (index > -1) {
      result = this.values[index];
    } else {
      result = value;
    }

    var formatter = this.formatter;
    result = parseInt(result, 10);
    result = formatter ? formatter(result) : fecha.format(result, this.mask);
    return result;
  }
  /**
   * @override
   */
  ;

  _proto.getTicks = function getTicks() {
    var self = this;
    var ticks = this.ticks;
    var rst = [];
    each(ticks, function (tick) {
      var obj;

      if (isObject(tick)) {
        obj = tick;
      } else {
        obj = {
          text: isString(tick) ? tick : self.getText(tick),
          value: self.scale(tick),
          tickValue: tick // 用于坐标轴上文本动画时确定前后帧的对应关系

        };
      }

      rst.push(obj);
    });
    return rst;
  } // 将时间转换为时间戳
  ;

  _proto._toTimeStamp = function _toTimeStamp(value) {
    return TimeUtil.toTimeStamp(value);
  };

  return TimeCategory;
}(Category);

Base.TimeCat = TimeCategory;
module.exports = TimeCategory;