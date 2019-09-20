"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

require("./npm/@tarojs/async-await/index.js");

var _index3 = require("./npm/@tarojs/redux/index.js");

var _dva = require("./utils/dva.js");

var _dva2 = _interopRequireDefault(_dva);

require("./utils/request.js");

var _common = require("./utils/common.js");

var _index4 = require("./models/index.js");

var _index5 = _interopRequireDefault(_index4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
var dvaApp = _dva2.default.createApp({
  initialState: {},
  models: _index5.default
});
var store = dvaApp.getStore();
(0, _index3.setStore)(store);

if (_index3.ReduxContext.Provider) {
  _index3.ReduxContext.Provider({
    store: store
  });
  _index3.ReduxContext.Provider({
    store: store
  });
}

var _App = function (_BaseComponent) {
  _inherits(_App, _BaseComponent);

  function _App() {
    _classCallCheck(this, _App);

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    var _this = _possibleConstructorReturn(this, (_App.__proto__ || Object.getPrototypeOf(_App)).apply(this, arguments));

    _this.config = {
      pages: ['pages/detail/index', 'pages/index/index', 'pages/user/index'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      }
    };

    _this.tobegin = function (res) {
      if (res.detail.userInfo) {
        // 返回的信息中包含用户信息则证明用户允许获取信息授权
        console.log('授权成功');
        // 保存用户信息微信登录
        _index2.default.setStorageSync('userInfo', res.detail.userInfo);
        // Tips.loding()
        _index2.default.login().then(function (resLogin) {
          // // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // if (resLogin.code){
          //   // 登录
          //   _login({...res.detail, code: resLogin.code},(result) => {
          //     if (result.data.status === 200){
          //       // 设置 token
          //       Taro.setStorageSync('token', result.data.data.token)
          //       // 登陆成功返回首页并刷新首页数据
          //       Taro.switchTab({url: '/pages/index/index'})
          //     } else {
          //       Taro.showToast({
          //         title: '登录失败，请稍后重试',
          //         icon: 'none',
          //         mask: true
          //       })
          //     }
          //   }, () => {
          //     Taro.showToast({
          //       title: '登录失败，请稍后重试',
          //       icon: 'none',
          //       mask: true
          //     })
          //   })
          // }
          // setLoading(false)
        });
      } else {
        _index2.default.switchTab({ url: '/pages/index/index' });
      }
    };

    return _this;
  }
  /**
   *
   *  1.小程序打开的参数 globalData.extraData.xx
   *  2.从二维码进入的参数 globalData.extraData.xx
   *  3.获取小程序的设备信息 globalData.systemInfo
   */


  _createClass(_App, [{
    key: "componentDidMount",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var referrerInfo, query, sys;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 获取参数
                referrerInfo = this.$router.params.referrerInfo;
                query = this.$router.params.query;

                !_common.globalData.extraData && (_common.globalData.extraData = {});
                if (referrerInfo && referrerInfo.extraData) {
                  _common.globalData.extraData = referrerInfo.extraData;
                }
                if (query) {
                  _common.globalData.extraData = _extends({}, _common.globalData.extraData, query);
                }
                // 获取设备信息
                _context.next = 7;
                return _index2.default.getSystemInfo();

              case 7:
                sys = _context.sent;

                sys && (_common.globalData.systemInfo = sys);
                console.log('globalData', _common.globalData);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _ref.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      _index2.default.checkSession().then(function (res) {
        console.log(res);
        return _index2.default.getStorage({ key: "session3rd" });
      }).catch(function (err) {
        console.log(err);
        return _index2.default.login().then(function (res) {
          // return Taro.request({
          //   url:'',
          //   data: { code: res.code },
          //   success: function(res) {
          //     if (res.statusCode == 200 && res.data.ret == 200) {
          //       Taro.setStorage({
          //         key: "session3rd",
          //         data: res.data.data.session3rd
          //       });
          //     } else if (res.statusCode == 500) {
          //       Taro.showToast({
          //         title: "发生错误,请重试！",
          //         icon: "none"
          //       });
          //     }
          //   }
          // });
        }).catch(function (err) {
          console.log(err);
          _index2.default.showToast({
            title: "发生错误,请重试！",
            icon: "none"
          });
        });
      });
      _index2.default.getSetting().then(function (res) {
        if (res.authSetting["scope.userInfo"]) {
          return true;
        } else {
          throw new Error('没有授权');
        }
      }).then(function (res) {
        return _index2.default.getUserInfo();
      }).then(function (res) {
        _index2.default.setStorage({
          key: 'userInfo',
          data: res.userInfo
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "componentDidCatchError",
    value: function componentDidCatchError() {}
  }, {
    key: "_createData",
    value: function _createData() {}
  }]);

  return _App;
}(_index.Component);

exports.default = _App;

App(require('./npm/@tarojs/taro-weapp/index.js').default.createApp(_App));
_index2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});