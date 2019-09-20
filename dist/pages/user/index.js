"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;
// import Api from '../../utils/request'


var _tslib = require("../../npm/tslib/tslib.js");

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/@tarojs/redux/index.js");

var _tips = require("../../utils/tips.js");

var _tips2 = _interopRequireDefault(_tips);

var _index4 = require("../../npm/@antv/f2/lib/index.js");

var _index5 = _interopRequireDefault(_index4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["RenderData", "dispatch", "data"], _this.config = {
      navigationBarTitleText: 'MT Data'
    }, _this.tobegin = function (userInfo) {
      console.log(userInfo);
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.state = {
        RenderData: []
      };
      this.$$refs = [];
    }
  }, {
    key: "getList",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.dispatch({
                  type: 'index/getList',
                  payload: {}
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getList() {
        return _ref2.apply(this, arguments);
      }

      return getList;
    }()
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      _tips2.default.loding();
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var arr, result, res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.getList();
                arr = [];
                result = this.props.data;

                result && result.map(function (e, i) {
                  var obj = {
                    genre: e.name,
                    sold: Math.random() * 100
                  };
                  arr.push(obj);
                });
                this.setState({
                  RenderData: arr
                });
                _context2.next = 7;
                return _index2.default.login();

              case 7:
                res = _context2.sent;

                console.log(res);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidMount() {
        return _ref3.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "drawRadar",
    value: function drawRadar(canvas, width, height) {
      //  雷达图
      // ⚠️ 别忘了这行
      // 为了兼容微信与支付宝的小程序，你需要通过这个命令为F2打补丁
      // F2Canvas.fixF2(F2);
      var data = [{ name: '超大盘能力', value: 6.5 }, { name: '抗跌能力', value: 9.5 }, { name: '稳定能力', value: 9 }, { name: '绝对收益能力', value: 6 }, { name: '选证择时能力', value: 6 }, { name: '风险回报能力', value: 8 }];
      var chart = new _index5.default.Chart({
        el: canvas,
        width: width,
        height: height
      });
      chart.source(data, {
        value: {
          min: 0,
          max: 10
        }
      });
      chart.coord('polar');
      chart.axis('value', {
        grid: {
          lineDash: null
        },
        label: null,
        line: null
      });
      chart.axis('name', {
        grid: {
          lineDash: null
        }
      });
      chart.area().position('name*value').color('#FE5C5B').style({
        fillOpacity: 0.2
      }).animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
      chart.line().position('name*value').color('#FE5C5B').size(1).animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
      chart.point().position('name*value').color('#FE5C5B').animate({
        appear: {
          delay: 300
        }
      });
      chart.guide().text({
        position: ['50%', '50%'],
        content: '73',
        style: {
          fontSize: 32,
          fontWeight: 'bold',
          fill: '#FE5C5B'
        }
      });
      chart.render();
    }
  }, {
    key: "drawRadar2",
    value: function drawRadar2(canvas, width, height) {
      // 柱状图
      // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
      var data = this.state.RenderData;
      // Step 1: 创建 Chart 对象
      console.log(data);
      var chart = new _index5.default.Chart({
        el: canvas,
        width: width,
        height: height
      });
      if (!data) {
        return;
      } // Step 2: 载入数据源
      chart.source(data, {
        sales: {
          tickCount: 1 // 刻度
        }
      });
      // chart.point().shape('type'); // 指定形状
      chart.tooltip({
        showTitle: true,
        showCrosshairs: true,
        showTooltipMarker: true,
        showItemMarker: false,
        background: {
          radius: 2,
          fill: '#1890FF',
          padding: [3, 5]
        },
        tooltipMarkerStyle: {
          fill: '#1890FF',
          fillOpacity: 0.1
        }
      });
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.interval().position('genre*sold').color('sold', '#FFFFFF-#1890FF');
      // chart.interval().position('genre*sold');
      // 柱状图添加文本
      data.map(function (obj) {
        chart.guide().text({
          position: [obj.genre, obj.sold],
          content: obj.sold,
          style: {
            textAlign: 'center',
            textBaseline: 'bottom'
          },
          offsetY: -4
        });
      });
      // Step 4: 渲染图表
      chart.render();
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      console.log(this.__props);
      Object.assign(this.__state, {});
      return this.__state;
    }
    /**
     * @name: by1773
     * @test: test font
     * @msg: 点击进入详情的方法
     * @param {type}
     * @return:
     */

  }, {
    key: "handleClickToDetail",
    value: function handleClickToDetail() {
      _index2.default.navigateTo({
        url: '/pages/detail/index'
      });
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["tobegin"], _class.$$componentPath = "pages/user/index", _temp2);
Index = (0, _tslib.__decorate)([(0, _index3.connect)(function (_ref4) {
  var index = _ref4.index;
  return _extends({}, index);
})], Index);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));