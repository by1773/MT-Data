import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Input, Button, Image, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
import Tips from '../../utils/tips'
import { IndexProps, IndexState } from './index.interface'
import './index.scss';
import Chart from 'taro-echarts'
import NavBar from 'taro-navigationbar';
import * as appImg from '../../assets/images/index'
import { CityPrice } from './data'
import { globalData, toPercent, DateFormat } from '../../utils/common';
import cityPrice from '../../components/cityPrice/index'
import { AtActivityIndicator, AtIcon } from 'taro-ui'
import { EButton, EPage } from 'eft-cool-taro-ui'
export interface Data {
  genres: string;
  sold: number;
  value?: number
}
@connect(({ index }) => ({
  ...index,
}))

class Index extends Component<IndexProps, IndexState> {
  config: Config = {
    // navigationBarTitleText: 'MT Data',
    usingComponents: {
      // 'navbar': NavBar, 
    },
  }
  constructor(props: IndexProps) {
    super(props)
    this.state = {
      isRender: false,
      RenderData: [],
      groupPrice: null,
      purchasePrice: null,
      sellingPrice: null,
      isCheckPass: false,
      serverTime: undefined,
      dateY: null,
      buyData: null,
      sellData: null,
      groupData: null,
      groupAveragePrice: {},
      dargStyle: {//下拉框的样式
        top: 0 + 'px'
      },
      downDragStyle: {//下拉图标的样式
        height: 0 + 'px'
      },
      downText: '下拉刷新',
      upDragStyle: {//上拉图标样式
        height: 0 + 'px'
      },
      pullText: '上拉加载更多',
      start_p: {},
      scrollY: true,
      dargState: 0,//刷新状态 0不做操作 1刷新 -1加载更多
      hasMore: true
      // ratioOfGroupPurchasePrice: -0.2538
      // success: true
      // todayAveragePrice: 
      // todayGroupAveragePriceIncrease: -510.09
      // yesterdayAfternoonAveragePrice: 
      // yesterdayMorningAverageGroupPrice
    }
  }



  componentWillMount() {
    this.handleGetIndexStatistics()
    this.handleGetServerTime()
    this.getIndexGroupAveragePrice()
    // Tips.loding('加载中')
    Taro.checkSession()
      .then(res => {
        console.log(res)
        return Taro.getStorage({ key: "session3rd" });
      })
      .catch(err => {
        console.log(err)
        return Taro.login()
          .then(res => {
            this.props.dispatch({
              type: 'index/addCode',
              payload: {
                code: res.code
              }
            })
          })
          .catch(err => {
            console.log(err);
            Taro.showToast({
              title: "发生错误,请重试！",
              icon: "none"
            });
          });
      });
  }

  componentDidMount() {
    this.handleGetServerTime()
    Tips.loaded()
  }

  onShareAppMessage() {
    return {
      title: 'MT Data茅台经销报价工具',
      path: 'pages/index/index',
      imageUrl: 'http://mt-spirit.com/images/shareImg.jpg'
    }
  }

  handlerGobackClick = () => {

  }
  handlerGohomeClick = () => {

  }
  render() {

    const { serverTime, dateY, buyData, sellData, groupData, groupAveragePrice
      , dargStyle
      , downDragStyle,
      isRender,
      noMore, hasMore, refreshStatus
    } = this.state
    const header = <NavBar
      color='#fff'
      background="#11131f"
      back={false}
      home={false}
      renderLeft={
        <View className='lxy-nav-bar-search'>
          <Image
            src={appImg.LOGO}
            style='width:199rpx;height:54rpx;margin-left:12rpx'
          />
        </View>
      }
      renderRight={
        <View className='renderRight'>
          <View className="renderRight-L">
            <Text>{serverTime ? `${serverTime.mouth}/${serverTime.toDay} ` : '--/--'}</Text>
            <Text>{serverTime ? serverTime.week : '-'}</Text>
          </View>
          <View className="renderRight-R">
            <Text>{serverTime ? serverTime.year : '--'}</Text>
          </View>
        </View>
      }
    />
    const refresherConfig = {
      recoverTime: 300,
      refreshTime: 1000
    }
    return (
      <EPage
        renderHeader={header}
        onRefresh={this.refresh}
        refresherConfig={refresherConfig}
        refreshStatus={refreshStatus}
        style="background:#11131f"
      >
        <ScrollView
          style={dargStyle}
          className='dragUpdata'
          scrollY={this.state.scrollY}
          scrollWithAnimation
          className='container discovery withtab'
        >
          <View className="Wrap">
            <View className='dragUpdataPage'>
              <View className='downDragBox' style={downDragStyle}>
                <AtActivityIndicator color='#00b388' size={32}></AtActivityIndicator>
                <Text className='downText'>{this.state.downText}</Text>
              </View>
              <View className="Title-Item">
                <Image src={appImg.HORIZONTALLINE} style="height:1pt;width:100%" />
                <View style="flex:1;display:flex;align-items: center;justify-content: space-between ;padding: 0  28rpx;">
                  <Text style="font-size:24rpx;">普通茅台飞天53°（500ml）</Text>
                  <AtIcon value='menu' size='25' color='#1d2029'></AtIcon>
                </View>
                <Image src={appImg.HORIZONTALLINE} style="height:1pt;width:100%" />
              </View>

              <View className="Title-Item Padding-H">
                <Text style="flex:1;display:flex;align-items: center;">
                  <Text style="font-size:24rpx">
                    今日市场终端参考零售价
                <Text style="font-size:20rpx">（贵州）</Text>
                  </Text>
                </Text>
              </View>

              <View className="Today-Price">
                <View className='Today-Price-Cover'>
                  <Image className='img' src={appImg.PRICEBG} />
                </View>
                <View className="Today-Top">
                  <Image className="Today-Icon" style='width: 35rpx;height: 35rpx;' src={appImg.PRICE} />
                  <Text className="Today-Num">{groupAveragePrice && groupAveragePrice.todayAveragePrice ? groupAveragePrice.todayAveragePrice + 50 : '--'}</Text>
                </View>
                <View className="Today-Bottom">
                  <Text>{groupAveragePrice && groupAveragePrice.todayGroupAveragePriceIncrease}{`(${toPercent(groupAveragePrice.ratioOfGroupPurchasePrice)})`}</Text>
                  <Image className="Today-Icon" style='width: 11rpx;height: 23rpx;'
                    src={groupAveragePrice && groupAveragePrice.ratioOfGroupPurchasePrice < 0 && groupAveragePrice.ratioOfGroupPurchasePrice != 0 ? appImg.DECLINE : appImg.UP} />
                  <Text className="Today-Num">比昨日零售价</Text>
                </View>
              </View>
              {/* 价格说明 */}
              <View className="Today-Desc Padding-H">
                <Text className="Desc-Text" style="margin-bottom:10rpx">*该价格指数由  <Text className="Text-Num">
                  {groupAveragePrice ? groupAveragePrice.submitUserNumber == -1 ? 100 : groupAveragePrice.submitUserNumber + 100 : '--'}</Text> 位 </Text>
                <Text className="Desc-Text">茅台酒专业销售人士所提供数据统计分析而得，仅供参考。</Text>
              </View>
              {/* 昨日价格 */}
              <View className="Price-Total Padding-H">
                <Text className="To-Price">昨日市场终端参考团购价<Text className="To-Price-Active">（贵州）</Text></Text>
                <View className="Price-AP-Container">
                  {/* 上 */}
                  <View className="Price-AP">
                    <View className="Price-AP-L">
                      <Text>6:00am</Text>
                      <Image src={appImg.VERTICALLINE} />
                      <Text>11:59am</Text>
                    </View>
                    <View className="Price-AP-R  Border-Right">
                      <View className="Price-AP-R-T">
                        <Text>早市价 </Text>

                        <Text> {groupAveragePrice && groupAveragePrice.yDay ? `${DateFormat(groupAveragePrice.yDay).mouth}/${DateFormat(groupAveragePrice.yDay).toDay}` : '--/--'}</Text>
                      </View>
                      <View className="Price-AP-R-B">
                        <View className="Price-AP-R-B-C">
                          <Image className="Today-Icon" style='width: 14px;height: 14px;' src={appImg.PRICE} />
                          <Text>{groupAveragePrice && groupAveragePrice.yesterdayMorningAverageGroupPrice ? groupAveragePrice.yesterdayMorningAverageGroupPrice : '--'}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {/* 下 */}
                  <View className="Price-AP">
                    <View className="Price-AP-L">
                      <Text>12:00am</Text>
                      <Image src={appImg.VERTICALLINE} />
                      <Text>18:00am</Text>
                    </View>
                    <View className="Price-AP-R">
                      <View className="Price-AP-R-T">
                        <Text>晚市价 </Text>
                        <Text> {groupAveragePrice && groupAveragePrice.yDay ? `${DateFormat(groupAveragePrice.yDay).mouth}/${DateFormat(groupAveragePrice.yDay).toDay}` : '--/--'}</Text>
                      </View>
                      <View className="Price-AP-R-B">
                        <View className="Price-AP-R-B-C">
                          <Image className="Today-Icon" style='width: 14px;height: 14px;' src={appImg.PRICE} />
                          <Text>{groupAveragePrice && groupAveragePrice.yesterdayAfternoonAveragePrice ? groupAveragePrice.yesterdayAfternoonAveragePrice + 50 : '--'}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              <View className="Submit-Container">
                <View className="Submit-Info">
                  <Text className="Submit-Info-Content">提交当日价格数据，可查询实时平均价</Text>
                </View>
                <View className="Submit-Item">
                  {/* 进货价 */}
                  <View className="Item-Fix">
                    <Text className="top desc">进货价</Text>
                    {/* <Text className="bottom desc">BUYING PRICE</Text> */}
                  </View>
                  <View className="Input-Container">
                    <Input
                      type="digit"
                      name="mobile"
                      maxLength={5}
                      placeholder="*请点击填写"
                      placeholderClass="input-p"
                      value={this.state.purchasePrice}
                      // onInput={this.getMobile}
                      onChange={(e) => {
                        this.setState({
                          purchasePrice: e.detail.value
                        }, () => {
                          this.handleCheckSataus()
                        })
                      }}
                    />
                  </View>
                </View>
                <View className="Submit-Item">
                  {/* 出货价 */}
                  <View className="Item-Fix">
                    <Text className="top desc">出货价</Text>
                    {/* <Text className="bottom desc">SELLING PRICE</Text> */}
                  </View>
                  <View className="Input-Container">
                    <Input
                      type="digit"
                      name="mobile"
                      maxLength={5}
                      placeholderClass="input-p"
                      placeholder="*请点击填写"
                      value={this.state.sellingPrice}
                      // onInput={this.getMobile}
                      onChange={(e) => {
                        this.setState({
                          sellingPrice: e.detail.value
                        }, () => {
                          this.handleCheckSataus()
                        })
                      }}
                    />
                  </View>
                </View>
                <View className="Submit-Item">
                  {/* 团购出货价 */}
                  <View className="Item-Fix">
                    <Text className="top desc">团购价</Text>
                    {/* <Text className="bottom desc">GROUP BUYING</Text> */}
                  </View>
                  <View className="Input-Container">
                    <Input
                      type="digit"
                      name="mobile"
                      maxLength={5}
                      placeholder="*请点击填写"
                      placeholderClass="input-p"
                      value={this.state.groupPrice}
                      // bindinput="bindKeyInput"
                      onChange={(e) => {
                        this.setState({
                          groupPrice: e.detail.value
                        }, () => {
                          this.handleCheckSataus()
                        })
                      }}

                    // onInput={this.getMobile}
                    />
                  </View>
                </View>

                {/* <View className="button" onClick={this.handleSubmit}>
              <Image  src={ this.state.isCheckPass ?appImg.SUBACTIVE:appImg.SUBNOACTIVE}/> */}

                <View className={this.state.isCheckPass ? "active button" : "button"} onClick={this.handleSubmit}>
                  {/*<Image  src={ this.state.isCheckPass ?appImg.SUBACTIVE:appImg.SUBNOACTIVE}/>*/}
                  <Text>提交 SUBMIT</Text>
                </View>
              </View>

              {/* 曲线走势图 */}
              {
                dateY && sellData && buyData && groupData && sellData.length > 0 && buyData.length > 0 && groupData.length > 0 ?
                  <View className="detail_chartsPanel detail_charts">
                    <View className="detail_chartsTitle">
                      <Image
                        src={appImg.FIFTEENCHART}
                        style='width:39rpx;height:27rpx'
                      />
                      <Text style='font-size:24rpx;color:#FEFFFF;margin-left:7rpx'>前15天价格曲线</Text>
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
                            // left : '3%',
                            // right : '4%',
                            // bottom : '0%',
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
                              show: false
                            },
                            show: true,
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
                              areaStyle:{
                                shadowColor:'#FF8A00',
                                opacity:0.3,
                              },
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
                isRender && dateY && dateY.length > 0 && buyData && buyData.length > 0 && groupData && groupData.length > 0 ?
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
              {/* 各地参考价啊 */}
              <View className="CK-Price-Container">
                <View className="CK-Price-Title Padding-H ">
                  <Text className="CK-Price-TitleContent">各地价格参考</Text>
                </View>
                <View className="CK-Price-Items">
                  {
                    CityPrice && CityPrice.length > 0 && CityPrice.map((e, i) => {
                      return (
                        <View className="CK-Price-Item" key={`jij${i}`}>
                          <View className="CK-Price-Item-T">
                            <Text className="big">{e.city}</Text>
                            <Text className="small">{e.alias}</Text>
                          </View>
                          <View className="CK-Price-Item-B">
                            <Text className="bigX">￥{e.price}</Text>
                            <Text className="small date">
                              {serverTime ? `${serverTime.year}/${serverTime.mouth}/${serverTime.toDay} ` : '--/--/--'}
                              {/* {e.date} */}
                            </Text>
                          </View>
                        </View>
                      )
                    })
                  }

                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </EPage>
    )
  }
  /**
   * @name: by1773
   * @test: test font
   * @msg: 点击进入详情的方法
   * @param {type} 
   * @return: 
   */
  handleSubmit(): void {

    // return
    const { groupPrice,
      purchasePrice,
      sellingPrice, isCheckPass } = this.state
    if (!isCheckPass) return
    const param = {
      groupPrice,
      purchasePrice,
      sellingPrice,
      submitUserCode: this.props.code || '',
      city:'guiyang'
    }

    this.props.dispatch({
      type: 'index/addQuot',
      payload: {
        ...param,
        method: 'POST'
      }
    }).then((res) => {
      if (res.success) {
        this.setState({
          groupPrice: null,
          purchasePrice: null,
          sellingPrice: null,
          isCheckPass: false
        })
        Taro.navigateTo({
          url: '/pages/detail/index'
        })
      }
    })

  }


  /**
   * @name: by1773
   * @test: 检查输入状态
   * @msg: 
   * @param {type} 
   * @return: 
   */

  handleCheckSataus = () => {
    const { groupPrice,
      purchasePrice,
      sellingPrice } = this.state

    if (groupPrice && purchasePrice && sellingPrice) {
      this.setState({
        isCheckPass: true
      })
    } else {
      this.setState({
        isCheckPass: false
      })
    }
  }

  /**
  * @name: by1773
  * @test: 获取系统时间
  * @msg: 
  * @param {type} 
  * @return: 
  */

  handleGetServerTime = () => {
    this.props.dispatch({
      type: 'index/getNowTime',
      payload: {
        method: 'GET'
      }
    }).then((res) => {
      if (res.success) {
        const time = DateFormat(res.currentTime) || undefined
        this.setState({
          serverTime: time
        })
      }
    })
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
      type: 'index/getIndexStatistics',
      payload: {
        days: 15,
        typeOfWine: 'maotaifeitian',
        method: 'POST'
      }
    }).then((res) => {
      let dateArr: any = []
      if (res.success) {
        let date = JSON.parse(JSON.stringify(res.result[0]))
        let a = JSON.parse(JSON.stringify(res.result[1]))
        let b = JSON.parse(JSON.stringify(res.result[2]))
        let c = JSON.parse(JSON.stringify(res.result[3]))

        date.map((e, i) => {
          dateArr.push(DateFormat(e).fullDay)
        })
        console.log('###################################################################################')
        console.log(a, b, c)
        console.log(res)
        this.setState({
          dateY: dateArr,
          buyData: a,
          sellData: b,
          groupData: c,
        }, () => {
          this.setState({
            isRender: true
          })
        })
      }

    })
  }


  /**
 * @name: by1773
 * @test: 获平局售价
 * @msg: 
 * @param {type} 
 * @return: 
 */

  getIndexGroupAveragePrice = () => {
    this.props.dispatch({
      type: 'index/getIndexGroupAveragePrice',
      payload: {
        typeOfWine: 'maotaifeitian',
        method: 'GET'
      }
    }).then((res) => {
      console.log(res)
      if (res.success) {
        this.setState({
          groupAveragePrice: res.result
        })
      }
    })
  }



  refresh = async () => {
    this.setState({
      refreshStatus: 1
    })

    await this.handleGetServerTime()
    await this.handleGetIndexStatistics()
    await this.getIndexGroupAveragePrice()
    setTimeout(() => {
      this.setState({
        refreshStatus: 2
      })
    }, Math.random() * 1000)
  }
}


export default Index
