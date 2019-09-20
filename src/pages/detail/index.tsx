import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image,Text } from '@tarojs/components'
// import TaroCanvasDrawer from '../../component/taro-plugin-canvas'; // 拷贝文件到component的引入方式
import { TaroCanvasDrawer  } from 'taro-plugin-canvas'; // npm 引入方式
import './index.scss'
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import * as appImg  from '../../assets/images/index'
import * as LineChart  from '../../components/LineChart'
import { globalData ,NetTime,toPercent} from '../../utils/common';
import NavBar from 'taro-navigationbar';

@connect(({ detail }) => ({
  ...detail,
}))
export default class Detail extends Component {
  config = {
    // navigationBarTitleText: '价格指数'
  }
  constructor(props) {
    super(props);
    this.state = {
      // 绘图配置文件
      config: null,
      // 绘制的图片
      shareImage: null,
      // TaroCanvasDrawer 组件状态
      canvasStatus: false,
      defaultDays:7,
      averageData:{},
      ec: {
        lazyLoad: true
      },
   
    }
  }

  /**
   * @name: by1773
   * @test: 拉取平均数据
   * @msg: 
   * @param {type} 
   * @return: 
   */

   getAverageData =() =>{
    this.props.dispatch({
      type: 'detail/getAverage',
      payload: {
        typeOfWine:'maotaifeitian',
        method:'GET'
      }
    }).then((res)=>{
      this.setState({
        averageData:res
      })
        // if(res.success){
        //    this.setState({
        //     groupPrice:null,
        //     purchasePrice:null,
        //     sellingPrice:null,
        //     isCheckPass:false
        //    })
        //    Taro.navigateTo({
        //     url:'/pages/detail/index'
        //   })
        // }
    })
   }

    /**
   * @name: by1773
   * @test: 拉取平均数据
   * @msg: 
   * @param {type} 
   * @return: 
   */

  getDaysData =() =>{
    const { defaultDays } =this.state
    this.props.dispatch({
      type: 'detail/getStatistics',
      payload: {
        days:defaultDays,
        typeOfWine:'maotaifeitian',
        method:'POST'
      }
    }).then((res)=>{
      
        // if(res.success){
        //    this.setState({
        //     groupPrice:null,
        //     purchasePrice:null,
        //     sellingPrice:null,
        //     isCheckPass:false
        //    })
        //    Taro.navigateTo({
        //     url:'/pages/detail/index'
        //   })
        // }
    })
   }
  componentWillMount(){
   this.getAverageData()
   this.getDaysData()
  }
  componentDidMount(){
    // this.canvasDrawFunc.bind(this, this.state.rssConfig)
    //this.canvasDrawFunc()
    const chartData = {
      dimensions: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      measures: [{
        data: [10, 52, 200, 334, 390, 330, 220]
      }]
    }
    this.lineChart.refresh(chartData);
  }
  refLineChart = (node) => this.lineChart = node
  // 调用绘画 => canvasStatus 置为true、同时设置config


  // 绘制成功回调函数 （必须实现）=> 接收绘制结果、重置 TaroCanvasDrawer 状态
  onCreateSuccess = (result) => {
    const { tempFilePath, errMsg } = result;
    Taro.hideLoading();
    if (errMsg === 'canvasToTempFilePath:ok') {
      this.setState({
        shareImage: tempFilePath,
        // 重置 TaroCanvasDrawer 状态，方便下一次调用
        canvasStatus: false,
        config: null
      })
    } else {
      // 重置 TaroCanvasDrawer 状态，方便下一次调用
      this.setState({
        canvasStatus: false,
        config: null
      })
      Taro.showToast({ icon: 'none', title: errMsg || '出现错误' });
      console.log(errMsg);
    }
    // 预览
    // Taro.previewImage({
    //   current: tempFilePath,
    //   urls: [tempFilePath]
    // })
  }

  // 绘制失败回调函数 （必须实现）=> 接收绘制错误信息、重置 TaroCanvasDrawer 状态
  onCreateFail = (error) => {
    Taro.hideLoading();
    // 重置 TaroCanvasDrawer 状态，方便下一次调用
    this.setState({
      canvasStatus: false,
      config: null
    })
    console.log(error);
  }

   // 保存图片至本地
  saveToAlbum = () => {
    const res = Taro.saveImageToPhotosAlbum({
      filePath: this.state.shareImage,
    });
    if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.showToast({
        title: '保存图片成功',
        icon: 'success',
        duration: 2000,
      });
    }
  }
  handlerGobackClick =()=>{
   Taro.navigateBack()
  }
  refresh(data) {
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setChartData(chart, data);
      return chart;
    });
  }

  refChart = node => (this.Chart = node);
  render() {
    const {averageData} = this.state
    return (
      <View className='index'>
        <NavBar
          title=''
          background='#000'
          color="#fff"
          // back
          // onBack={this.handlerGobackClick}
          renderLeft={
            <View className='lxy-nav-bar-search' 
            onClick={()=>{
              this.handlerGobackClick()
            }}
            >
              <Image 
                src={appImg.LOGO}
                style='width:199rpx;height:54rpx'
              />
            </View>
          }
          renderRight={
            <View className='lxy-nav-bar-search'>
                <Image 
                  src={appImg.DOWNLOAD}
                  style='width:25rpx;height:26rpx'
                />
                <Text className="topbar_down">DOWN</Text>
            </View>
          }
        />
        {/*<View className='shareImage-cont'>
          <Image
            className='shareImage'
            src={this.state.shareImage}
            mode='widthFix'
            lazy-load
          />
          {
            // 由于部分限制，目前组件通过状态的方式来动态加载
            this.state.canvasStatus &&
            (<TaroCanvasDrawer
              config={this.state.config} // 绘制配置
              onCreateSuccess={this.onCreateSuccess} // 绘制成功回调
              onCreateFail={this.onCreateFail} // 绘制失败回调
            />
            )
          }
        </View>*/}
        {/*<View className="handle-icon">
          <View className='at-icon at-icon-download' onClick={this.saveToAlbum}></View>
          <View className='at-icon at-icon-share'></View>
        </View>*/}
        {/* <View className="detail_topbar">
          <Image 
            src={appImg.LOGO}
            style='width:199rpx;height:54rpx'
          />
          <View>
            <Image 
              src={appImg.DOWNLOAD}
              style='width:25rpx;height:26rpx'
            />
            <Text className="topbar_down">DOWN</Text>
          </View>
          
        </View> */}
        <View className="detail_moutai">
          <Text style='font-size:24rpx;color:white;'>普通茅台飞天53° (500ml)</Text>
          <Text style='font-size:24rpx;color:white;'>待定</Text>
        </View>
        <View className="detail_moutai_price">
          <View className="detail_moutai_price_an">
            <View className="pricePanelTitle">
              <Image 
                src={appImg.PRICE}
                style='width:37rpx;height:35rpx;'
              />
              <Text style='font-size:18rpx;color:#F0F0F1'>贵州市场均价</Text>
            </View>
            <View className="pricePanelTime">
              2019/09/19
            </View>
          </View>
          <View className="pricePanelContainer">
            <View className="priceList">
              <Text style='font-size:24rpx;color:white'>平均进货价：</Text>
              <Text style='font-size:41rpx;color:white;font-weight:bold'>{ averageData && averageData.average_prices.purchaseAveragePrice}</Text>
              <View className="priceListA">
                <Text>{ averageData && averageData.amount_of_price_increase.purchaseAveragePrice}</Text>
                <View className="priceListRight">
                  <Text>{ averageData && toPercent(averageData.purchasea_average_price_ratio)}</Text>
                  <Image
                   src={ averageData.purchasea_average_price_ratio < 0 ?appImg.DECLINE:appImg.UP}
                    style='width:9rpx;height:19rpx;'
                  />
                </View>
              </View>
            </View>
            <View className="priceList">
              <Text style='font-size:24rpx;color:white'>平均出货价：</Text>
              <Text style='font-size:41rpx;color:white;font-weight:bold'>{ averageData && averageData.average_prices.sellingAveragePrice}</Text>
              <View className="priceListA">
                <Text>{ averageData && averageData.amount_of_price_increase.sellingAveragePrice}</Text>
                <View className="priceListRight">
                  <Text>{ averageData && toPercent(averageData.sell_average_price_ratio)}</Text>
                  <Image
                    src={ averageData.sell_average_price_ratio < 0 ?appImg.DECLINE:appImg.UP}
                    style='width:9rpx;height:19rpx;'
                  />
                </View>
              </View>
            </View>
            <View className="priceList">
              <Text style='font-size:24rpx;color:white'>平均团购价：</Text>
              <Text style='font-size:41rpx;color:white;font-weight:bold'>{ averageData && averageData.average_prices.groupAveragePrice}</Text>
              <View className="priceListA">
                <Text>{ averageData && averageData.amount_of_price_increase.groupAveragePrice}</Text>
                <View className="priceListRight">
                  <Text>{ averageData && toPercent(averageData.group_purchase_price_ratio)}</Text>
                  <Image
                     src={ averageData.group_purchase_price_ratio < 0 ?appImg.DECLINE:appImg.UP}
                    style='width:9rpx;height:19rpx;'
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="pricePanelBottom">
            <Text style="margin-top:40rpx;">*该价格指数由<Text style="color:#FF8A00;font-size:24rpx;border-bottom:1rpx solid white;">{ averageData && averageData.providing_persons_number + 100}</Text>位</Text>
            <Text style="margin-top:20rpx;">茅台酒专业销售人士所提供数据统计分析而得，仅供参考。</Text>
          </View>
        </View>
        <View className="detail_charts">
          <View className="detail_chartsTitle">
            <Image 
              src={appImg.SEVENCHART}
              style='width:39rpx;height:27rpx'
            />
            <Text style='font-size:24rpx;color:#FEFFFF;margin-left:7rpx'>7天趋势</Text>
          </View>
          <View className="detail_chartsPanel">
            <View className="calc">
              <View className="calcList">
                <Text>09/13</Text>
                <Text>星期四</Text>
                <Text>THU</Text>
              </View>
              <View className="calcList">
                <Text>09/13</Text>
                <Text>星期四</Text>
                <Text>THU</Text>
              </View>
              <View className="calcList">
                <Text>09/13</Text>
                <Text>星期四</Text>
                <Text>THU</Text>
              </View>
              <View className="calcList">
                <Text>09/13</Text>
                <Text>星期四</Text>
                <Text>THU</Text>
              </View>
              <View className="calcList">
                <Text>09/13</Text>
                <Text>星期四</Text>
                <Text>THU</Text>
              </View>
              <View className="calcList">
                <Text>09/13</Text>
                <Text>星期四</Text>
                <Text>THU</Text>
              </View>
              <View className="calcList" style="border:0">
                <Text>09/13</Text>
                <Text>星期四</Text>
                <Text>THU</Text>
              </View>
            </View>
            <View className="line-chart">
                <LineChart ref={this.refLineChart} />
            </View> 
          </View>
          <View className="detail_chartsMark">
            <View className="detail_chartsMarkList">
              <View style="background:#3D2BA4;width:44rpx;height:5rpx;"></View>
              <View className="detail_chartsMarkListRight">
                <Text style="font-size:16rpx;color:#FEFFFF">进货价</Text>
                <Text style="font-size:9rpx;color:#DEDEDE">BUYING PRICE</Text>
              </View>
            </View>
            <View className="detail_chartsMarkList">
              <View style="background:#26DDB1;width:44rpx;height:5rpx;"></View>
              <View className="detail_chartsMarkListRight">
                <Text style="font-size:16rpx;color:#FEFFFF">出货价</Text>
                <Text style="font-size:9rpx;color:#DEDEDE">SELLING PRICE</Text>
              </View>
            </View>
            <View className="detail_chartsMarkList">
              <View style="background:#FF8A00;width:44rpx;height:5rpx;"></View>
              <View className="detail_chartsMarkListRight">
                <Text style="font-size:16rpx;color:#FEFFFF">团购价</Text>
                <Text style="font-size:9rpx;color:#DEDEDE">GROUP BUYING</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}