"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Detail = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Detail, _BaseComponent);

  function Detail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Detail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Detail.__proto__ || Object.getPrototypeOf(Detail)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["config", "shareImage", "canvasStatus", "rssConfig"], _this.config = {
      navigationBarTitleText: '价格指数'
    }, _this.canvasDrawFunc = function () {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.rssConfig;

      _this.setState({
        canvasStatus: true,
        config: config
      });
      _index2.default.showLoading({
        title: '绘制中...'
      });
    }, _this.onCreateSuccess = function (result) {
      var tempFilePath = result.tempFilePath,
          errMsg = result.errMsg;

      _index2.default.hideLoading();
      if (errMsg === 'canvasToTempFilePath:ok') {
        _this.setState({
          shareImage: tempFilePath,
          // 重置 TaroCanvasDrawer 状态，方便下一次调用
          canvasStatus: false,
          config: null
        });
      } else {
        // 重置 TaroCanvasDrawer 状态，方便下一次调用
        _this.setState({
          canvasStatus: false,
          config: null
        });
        _index2.default.showToast({ icon: 'none', title: errMsg || '出现错误' });
        console.log(errMsg);
      }
      // 预览
      // Taro.previewImage({
      //   current: tempFilePath,
      //   urls: [tempFilePath]
      // })
    }, _this.onCreateFail = function (error) {
      _index2.default.hideLoading();
      // 重置 TaroCanvasDrawer 状态，方便下一次调用
      _this.setState({
        canvasStatus: false,
        config: null
      });
      console.log(error);
    }, _this.saveToAlbum = function () {
      var res = _index2.default.saveImageToPhotosAlbum({
        filePath: _this.state.shareImage
      });
      if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
        _index2.default.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        });
      }
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Detail, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Detail.prototype.__proto__ || Object.getPrototypeOf(Detail.prototype), "_constructor", this).call(this, props);

      this.state = {
        // 绘图配置文件
        config: null,
        // 绘制的图片
        shareImage: null,
        // TaroCanvasDrawer 组件状态
        canvasStatus: false,
        rssConfig: {
          width: 750,
          height: 1334,
          backgroundColor: '#fff',
          debug: false,
          images: [{
            x: 0,
            y: 0,
            url: '../../assets/images/price.png',
            width: 199,
            height: 54
          }],
          texts: [{
            x: 80,
            y: 300,
            text: '该数据来自于128人统计，仅供参考！',
            fontSize: 32,
            color: '#9e9e9e',
            opacity: 1,
            baseLine: 'middle',
            lineHeight: 48,
            lineNum: 2,
            textAlign: 'left',
            width: 580,
            zIndex: 999
          }]
        }
      };
      this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // this.canvasDrawFunc.bind(this, this.state.rssConfig)
      //this.canvasDrawFunc()
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      Object.assign(this.__state, {});
      return this.__state;
    }
  }]);

  return Detail;
}(_index.Component), _class.$$events = [], _class.$$componentPath = "pages/detail/index", _temp2);
exports.default = Detail;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Detail, true));