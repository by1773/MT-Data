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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["RenderData", "bottom", "dispatch", "data"], _this.config = {
      navigationBarTitleText: 'MT Data'
    }, _this.tobegin = function (userInfo) {
      console.log(userInfo);
    }, _this.refAddChart = function (node) {
      return _this.addChart = node;
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);

      this.state = {
        RenderData: [],
        bottom: [{ id: 'Move', name: '可滑动的图表' }, { id: 'More', name: '一个页面多个图表' }, { id: 'Add', name: '多图表结合在一起' }]
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
      _tips2.default.loding('加载中');
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var arr, result, chartData, res;
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
                chartData = {
                  barData: [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078],
                  lineData: [1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298]
                };
                // this.addChart.refresh(chartData);

                _context2.next = 8;
                return _index2.default.login();

              case 8:
                res = _context2.sent;

                console.log(res);
                _tips2.default.loaded();

              case 11:
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
    key: "onShareAppMessage",
    value: function onShareAppMessage() {
      return {
        title: '各种图表在Taro中的使用',
        path: 'pages/index/index',
        imageUrl: 'http://img12.360buyimg.com/devfe/jfs/t1/20633/16/5554/7231/5c3f0272E1a342ec4/4ce472e34ad9a4cd.png'
      };
    }
  }, {
    key: "gotoEcharts",
    value: function gotoEcharts(type) {
      _index2.default.navigateTo({ url: "/pages/" + type + "/" + type });
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
}(_index.Component), _class.$$events = ["handleClickToDetail"], _class.$$componentPath = "pages/index/index", _temp2);
Index = (0, _tslib.__decorate)([(0, _index3.connect)(function (_ref4) {
  var index = _ref4.index;
  return _extends({}, index);
})], Index);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));