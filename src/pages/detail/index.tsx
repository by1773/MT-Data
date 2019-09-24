import Taro, { Component } from '@tarojs/taro'
import { View, Button, Image, Text, Canvas, ScrollView } from '@tarojs/components'
// import TaroCanvasDrawer from '../../component/taro-plugin-canvas'; // 拷贝文件到component的引入方式
import { TaroCanvasDrawer } from 'taro-plugin-canvas'; // npm 引入方式
import './index.scss'
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import * as appImg from '../../assets/images/index'
import { globalData, toPercent, DateFormat } from '../../utils/common';
import NavBar from 'taro-navigationbar';
import Chart from 'taro-echarts'
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
      fullDay:null,
      defaultDays: 7,
      averageData: {},
      dateY: [],
      buyData: [],
      sellData: [],
      groupData: [],
      ec: {
        lazyLoad: true
      },
      //  -------------
      // 绘图配置文件
      config: null,
      // 绘制的图片
      shareImage: null,
      // TaroCanvasDrawer 组件状态
      canvasStatus: false,
      rssConfig: {
        width: 750,
        height: 200,
        backgroundColor: '#fff',
        debug: false,
        texts: [
          {
            x: 80,
            y: 80,
            text: '平均进货价:',
            fontSize: 32,
            color: '#000',
            opacity: 1,
            baseLine: 'middle',
            lineHeight: 50,
            lineNum: 2,
            textAlign: 'left',
            width: 580,
            zIndex: 999,
          },
          {
            x: 80,
            y: 120,
            text: '平均出货价:',
            fontSize: 32,
            color: '#000',
            opacity: 1,
            baseLine: 'middle',
            textAlign: 'left',
            lineHeight: 50,
            lineNum: 1,
            zIndex: 999,
          },
          {
            x: 80,
            y: 160,
            text: '平均团购价:',
            fontSize: 32,
            color: '#000',
            opacity: 1,
            baseLine: 'middle',
            textAlign: 'left',
            lineHeight: 50,
            lineNum: 1,
            zIndex: 999,
          }
        ],
        lines: [
          {
            startY: 540,
            startX: 80,
            endX: 670,
            endY: 541,
            width: 1,
            color: '#eee',
          }
        ]
      },
      screenWidth: 0,
      screenHeight: 0,
      dargStyle: {//下拉框的样式
        top: 0 + 'px',
        // overflow:'auto'
        background: '#11131f'
      },
      scrollY: true,
    }
  }

  /**
   * @name: by1773
   * @test: 拉取平均数据
   * @msg: 
   * @param {type} 
   * @return: 
   */

  getAverageData = () => {
    this.props.dispatch({
      type: 'detail/getAverage',
      payload: {
        typeOfWine: 'maotaifeitian',
        method: 'GET'
      }
    }).then((res) => {
      this.setState({
        averageData: res
      }, () => {
        let a = JSON.parse(JSON.stringify(this.state.rssConfig))
        a.texts[0].text = `平均进货价：${res.average_prices.purchaseAveragePrice}`
        a.texts[1].text = `平均出货价：${res.average_prices.sellingAveragePrice}`
        a.texts[2].text = `平均团购价：${res.average_prices.groupAveragePrice}`
        this.setState({
          rssConfig: a
        }, () => {
          this.canvasDrawFunc()
        })

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

  getDaysData = () => {
    const { defaultDays } = this.state
    this.props.dispatch({
      type: 'detail/getStatistics',
      payload: {
        days: defaultDays,
        typeOfWine: 'maotaifeitian',
        method: 'POST'
      }
    }).then((res) => {

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
  componentWillMount() {
    this.handleGetIndexStatistics()
    this.getAverageData()
    this.getDaysData()
    let that = this
    Taro.getSystemInfo({
      success: function (res) {
        that.setState({
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight
        })
      }
    })
  }
  componentDidMount() {
    // this.canvasDrawFunc.bind(this, this.state.rssConfig)
    // this.drawList()
  }
  // 调用绘画 => canvasStatus 置为true、同时设置config


  drawList() {
    const { screenWidth } = this.state;
    let i = 100;
    let height = 0;
    let that = this;
    const cvsCtx = Taro.createCanvasContext('poster', this);
    console.log('##################################################################################')
    console.log(cvsCtx)

    cvsCtx.setFillStyle('#1d2029')
    // cvsCtx.setFillStyle('red')
    cvsCtx.fillRect(0, 0, screenWidth, 100 + height)
    cvsCtx.setFontSize(14)
    // cvsCtx.fillStyle = "white"; 　
    cvsCtx.fillRect(0, 0, 375, 40 + height);
    cvsCtx.setFillStyle('black')
    cvsCtx.fillText('平局进货价：', 20, 25 + height);
    cvsCtx.fillText('---', 60, 25 + height);
    cvsCtx.fillText('平均出货价：', 20, 45 + height);
    cvsCtx.fillText('---', 60, 45 + height);
    cvsCtx.fillText('平均团购价：', 20, 65 + height);
    cvsCtx.fillText('---', 60, 65 + height);
    // cvsCtx.strokeStyle = "#eee";  //横线颜色
    cvsCtx.fillStyle = "#eee";
    cvsCtx.draw();
  }



  handlerGobackClick = () => {
    Taro.navigateBack()
  }
  render() {
    const { averageData, dateY, buyData, sellData, groupData ,fullDay} = this.state
    // console.log(dateY[dateY.length-1].week)
    return (
      <View className='index'>
        <NavBar
          title=''
          background='#11131f'
          color="#fff"
          // back
          // onBack={this.handlerGobackClick}
          renderLeft={
            <View className='lxy-nav-bar-search'
              onClick={() => {
                this.handlerGobackClick()
              }}
            >
              <Image
                src={appImg.LOGO}
                style='width:199rpx;height:54rpx;margin-left:15Px'
              />
            </View>
          }
          renderRight={
            <View className='lxy-nav-bar-search' onClick={this.saveToAlbum}>
              <Image
                src={appImg.DOWNLOAD}
                style='width:25rpx;height:26rpx'
              />
              <Text className="topbar_down">DOWN</Text>
            </View>
          }
        />
        <ScrollView
          style={this.state.dargStyle}
          className='dragUpdata'
          scrollY={this.state.scrollY}
          scrollWithAnimation
          className='container discovery withtab'
        >

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
          {/* <View style="padding: 0 80rpx;">
              <Canvas canvasId="poster" style="width:100%;height:500"></Canvas>
          </View> */}

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
            {/* <Text style='font-size:24rpx;color:white;'>普通茅台飞天53° (500ml)</Text>
          <AtIcon value='menu' size='25' color='white'></AtIcon> */}
            <Image src={appImg.HORIZONTALLINE} style="height:1pt;width:100%" />
            <View style="flex:1;display:flex;align-items: center;justify-content: space-between ;padding: 0  28rpx;">
              <Text style="font-size:24rpx;">普通茅台飞天53°（500ml）</Text>
              <AtIcon value='menu' size='25' color='#1d2029'></AtIcon>
            </View>
            <Image src={appImg.HORIZONTALLINE} style="height:1pt;width:100%" />
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
                {fullDay && fullDay.year ? `${fullDay.year}/${fullDay.mouth}/${fullDay.toDay}` : '--/--/--'}
              </View>
            </View>
            <View className="pricePanelContainer">
              <View className="priceList">
                <Text style='font-size:24rpx;color:white'>平均进货价：</Text>
                <Text style='font-size:41rpx;color:white;font-weight:bold'>{averageData && `￥${averageData.average_prices.purchaseAveragePrice}`}</Text>
                <View className="priceListA">
                  <Text>{averageData && averageData.amount_of_price_increase.purchaseAveragePrice}</Text>
                  <View className="priceListRight">
                    <Text>{averageData && toPercent(averageData.purchasea_average_price_ratio)}</Text>
                    <Image
                      src={averageData.purchasea_average_price_ratio < 0 && averageData.purchasea_average_price_ratio != 0 ? appImg.DECLINE : appImg.UP}
                      style='width:9rpx;height:19rpx;'
                    />
                  </View>
                </View>
              </View>
              <View className="priceList">
                <Text style='font-size:24rpx;color:white'>平均出货价：</Text>
                <Text style='font-size:41rpx;color:white;font-weight:bold'>{averageData ? `￥${averageData.average_prices.sellingAveragePrice}`:'--'}</Text>
                <View className="priceListA">
                  <Text>{averageData && averageData.amount_of_price_increase.sellingAveragePrice}</Text>
                  <View className="priceListRight">
                    <Text>{averageData && toPercent(averageData.sell_average_price_ratio)}</Text>
                    <Image
                      src={averageData.sell_average_price_ratio < 0 && averageData.sell_average_price_ratio != 0 ? appImg.DECLINE : appImg.UP}
                      style='width:9rpx;height:19rpx;'
                    />
                  </View>
                </View>
              </View>
              <View className="priceList">
                <Text style='font-size:24rpx;color:white'>平均团购价：</Text>
                <Text style='font-size:41rpx;color:white;font-weight:bold'>{averageData && `￥${averageData.average_prices.groupAveragePrice}`}</Text>
                <View className="priceListA">
                  <Text>{averageData && averageData.amount_of_price_increase.groupAveragePrice}</Text>
                  <View className="priceListRight">
                    <Text>{averageData && toPercent(averageData.group_purchase_price_ratio)}</Text>
                    <Image
                      src={averageData.group_purchase_price_ratio < 0 && averageData.group_purchase_price_ratio != 0 ? appImg.DECLINE : appImg.UP}
                      style='width:9rpx;height:19rpx;'
                    />
                  </View>
                </View>
              </View>
            </View>
            <View className="pricePanelBottom">
              <Text style="margin-top:40rpx;">*该价格指数由<Text style="color:#FF8A00;font-size:24rpx;border-bottom:1rpx solid white;">
                {averageData && averageData.providing_persons_number ? averageData.providing_persons_number + 100 : '--'}</Text>位</Text>
              <Text style="margin-top:20rpx;">茅台酒专业销售人士所提供数据统计分析而得，仅供参考。</Text>
            </View>
          </View>
          {
            dateY && sellData && buyData && groupData && sellData.length > 0 && buyData.length > 0 && groupData.length > 0 ?
              <View className="detail_chartsPanel">
                <View className="detail_chartsTitle">
                  <Image
                    src={appImg.SEVENCHART}
                    style='width:39rpx;height:27rpx'
                  />
                  <Text style='font-size:24rpx;color:#FEFFFF;margin-left:7rpx'>前7天价格曲线</Text>
                </View>
                <View className="calc">
                  {/* {
                    dateY && dateY.length > 0 && dateY.map((e, i) => {
                      return <View className="calcList" key={`-oii` + i}>
                        <Text>{e.toDay}/{e.mouth}</Text>
                        <Text>{e.week}</Text>
                        <Text>{e.weekAlias}</Text>
                      </View>
                    })
                  } */}
                </View>


                <View className="line-chart">
                  <Chart
                    option={{
                      grid: {
                        left: 10,
                        right: 10,
                        top: 20,
                        bottom: 0,
                        containLabel: true
                      }
                    xAxis: {
                        type: 'category',
                        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        data: dateY,
                        splitLine:{
                          show: true,
                          lineStyle:{
                            color: ['#1d2029'],
                            width: 1,
                            type: 'dashed'
                        }
                        },
                      },
                      yAxis: {
                        type: 'value',
                        splitLine:{
                          show: false,
                        },
                        max: Math.floor(Math.max(...buyData, ...sellData, ...groupData)+200),
                        min: Math.floor(Math.min(...buyData, ...sellData, ...groupData)-200)
                      },
                      dataZoom: [
                        {
                          type: 'slider',
                          start: 0,
                          show: false,
                          end: 80,
                        },
                        {
                          type: 'inside',
                          start: 0,
                          end: 80,
                          filterMode: 'filter',
                        },
                      ],

                      series: [
                        {
                          data: buyData,
                          type: 'line',
                          itemStyle: {
                            normal: {
                              color: '#3D2BA4',
                              barBorderRadius: 0,
                              label: {
                                show: false,
                                position: "bottom",
                              }
                            }
                          },
                          label: {
                            normal: {
                              show: true,
                              position: 'top',
                              color: '#3D2BA4'
                            }
                          },
                        },
                        {
                          data: sellData,
                          type: 'line',
                          itemStyle: {
                            normal: {
                              color: "#26DDB1",
                              barBorderRadius: 0,
                              label: {
                                show: false,
                                position: "bottom",
                              }
                            }
                          },
                          label: {
                            normal: {
                              show: true,
                              position: 'top',
                              color: '#26DDB1'
                            }
                          },
                        },
                        {
                          data: groupData,
                          type: 'line',
                          itemStyle: {
                            normal: {
                              color: "#FF8A00",
                              barBorderRadius: 0,
                              label: {
                                show: false,
                                position: "bottom",
                              }
                            }
                          },
                          areaStyle:{
                            shadowColor:'#FF8A00',
                            opacity:0.3,
                          },
                          label: {
                            normal: {
                              show: true,
                              // position: 'top',
                              position: 'bottom',
                              // color: '#FF8A00'
                              color: '#fff'
                            }
                          },
                        }
                      ]
                    }}
                  />
                </View>
              </View>
              :
              <View></View>
          }

          {
            dateY && dateY.length > 0 && buyData && buyData.length > 0 && groupData && groupData.length > 0 ?
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
              </View> :
              <View></View>
          }
        </ScrollView>
      </View>
    )
  }
  /**
* @name: by1773
* @test: 获取图表数据
* @msg: 
* @param {type} 
* @return: 
*/

  handleGetIndexStatistics = () => {
    this.props.dispatch({
      type: 'detail/getStatistics',
      payload: {
        days: 7,
        typeOfWine: 'maotaifeitian',
        method: 'POST'
      }
    }).then((res) => {
      let dateArr: Array<any> = []
      if (res.success) {
        let date = res.result[0]
        date.map((e, i) => {
          dateArr.push(DateFormat(e).fullDay)
        })
        this.setState({
          fullDay:DateFormat(date[date.length - 1]),
          dateY: dateArr,
          buyData: res.result[1],
          sellData: res.result[2],
          groupData: res.result[3],
        })

      }

    })
  }
  //################################################################################################################################
  // 调用绘画 => canvasStatus 置为true、同时设置config
  canvasDrawFunc = (config = this.state.rssConfig) => {
    Taro.hideLoading();
    this.setState({
      canvasStatus: true,
      config: config,
    })
    // Taro.showLoading({
    //   title: '绘制中...'
    // })
    Taro.hideLoading();
  }

  // 绘制成功回调函数 （必须实现）=> 接收绘制结果、重置 TaroCanvasDrawer 状态
  onCreateSuccess = (result) => {
    Taro.hideLoading();
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
    Taro.showLoading({
      title: '保存中...'
    })
    const res = Taro.saveImageToPhotosAlbum({
      filePath: this.state.shareImage,
    });
    if (res.errMsg === 'saveImageToPhotosAlbum:ok') {
      Taro.hideLoading();
      Taro.showToast({
        title: '保存图片成功',
        icon: 'success',
        duration: 2000,
      });
    }
    Taro.hideLoading();
  }
}