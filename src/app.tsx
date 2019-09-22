import Taro, { Component, Config } from '@tarojs/taro'
import "@tarojs/async-await";
import { Provider } from "@tarojs/redux";
import dva from './utils/dva';
import './utils/request';
import { globalData ,toPercent} from './utils/common';
import { View, Text,Button} from '@tarojs/components'
import models from './models'
import Index from './pages/index'
import Loading from './pages/loading'
import './app.scss'
import Tips from './utils/tips'
import 'taro-ui/dist/style/index.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


const dvaApp = dva.createApp({
  initialState:{},
  models:  models,
})

const store = dvaApp.getStore();

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/loading/index',
      'pages/index/index',
      'pages/detail/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom',
    },
   
  };
  

  /**
   *
   *  1.小程序打开的参数 globalData.extraData.xx
   *  2.从二维码进入的参数 globalData.extraData.xx
   *  3.获取小程序的设备信息 globalData.systemInfo
   */
  async componentDidMount () {
    // 获取参数
    const referrerInfo = this.$router.params.referrerInfo
    const query = this.$router.params.query
    !globalData.extraData && (globalData.extraData = {})
    if (referrerInfo && referrerInfo.extraData) {
      globalData.extraData = referrerInfo.extraData
    }
    if (query) {
      globalData.extraData = {
        ...globalData.extraData,
        ...query
      }
    }

    // 获取设备信息
    const sys = await Taro.getSystemInfo()
    sys && (globalData.systemInfo = sys)
    console.log('globalData',globalData)
    
 
  }
  
  componentWillMount(){
  }
  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}



   tobegin = (res) => {
    if(res.detail.userInfo){ // 返回的信息中包含用户信息则证明用户允许获取信息授权
      // console.log('授权成功')
      // 保存用户信息微信登录
      // Taro.setStorageSync('userInfo', res.detail.userInfo)

      // Tips.loding()
      Taro.login()
        .then(resLogin => {
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
        })
    } else {
      // Taro.switchTab({url: '/pages/index/index'})
    }
  }

  
  render () {
    return (
      <Provider store={store}>
         {/* <Index /> */}
         <Loading/>
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
