import Taro, { Component, Config } from '@tarojs/taro'
import {View, Text, Input, Button,Image,ScrollView   } from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
import Tips from '../../utils/tips'
import { IndexProps, IndexState } from './index.interface'
import './index.scss';
import Chart from 'taro-echarts'
import NavBar from 'taro-navigationbar';
import * as appImg  from '../../assets/images/index'
import { CityPrice } from './data'
import { globalData ,toPercent,DateFormat} from '../../utils/common';
import cityPrice from '../../components/cityPrice/index'  
import { AtActivityIndicator,AtIcon } from 'taro-ui'
export interface Data {
  genres:string;
  sold:number;
  value?:number
}
@connect(({ index }) => ({
    ...index,
}))

class Index extends Component<IndexProps,IndexState > {
  config:Config = {
    // navigationBarTitleText: 'MT Data',
    usingComponents: {
        // 'navbar': NavBar, 
    },
  }
  constructor(props: IndexProps) {
    super(props)
    this.state = {
      RenderData:[],
      groupPrice:null,
      purchasePrice:null,
      sellingPrice:null,
      isCheckPass:false,
      serverTime:null,
      dateY:[],
      buyData:[],
      sellData:[],
      groupData:[],
      groupAveragePrice:{},
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
    scrollY:true,
    dargState: 0//刷新状态 0不做操作 1刷新 -1加载更多

      // ratioOfGroupPurchasePrice: -0.2538
      // success: true
      // todayAveragePrice: 
      // todayGroupAveragePriceIncrease: -510.09
      // yesterdayAfternoonAveragePrice: 
      // yesterdayMorningAverageGroupPrice
    }
  }



  componentWillMount(){
    this.handleGetServerTime()
    this.handleGetIndexStatistics()
    this.getIndexGroupAveragePrice()
    Tips.loding('加载中')
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
              code:res.code
            }
          })
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
        })
        .catch(err => {
          console.log(err);
          Taro.showToast({
            title: "发生错误,请重试！",
            icon: "none"
          });
        });
    });
    Taro.getSetting()
      .then(res=>{
        if(res.authSetting["scope.userInfo"]){
          return true;
        }else {
          throw new Error('没有授权')
        }
      })
      .then(res=>{
        return Taro.getUserInfo();
      })
      .then(res=>{
        Taro.setStorage({
          key: 'userInfo',
          data: res.userInfo
        })
      })
      .catch(err=>{
        console.log(err)
      })
  }

 componentDidMount() {
    Tips.loaded()
  }


  tobegin = (userInfo) => {

    console.log(userInfo);


  };
  onShareAppMessage () {
    return {
      title: 'MT Data茅台经销报价工具',
      path:  'pages/index/index',
      imageUrl: 'http://mt-spirit.com/images/shareImg.jpg'
    }
  }
  gotoEcharts(type) {
    Taro.navigateTo({ url: `/pages/${type}/${type}` });
  }
  handlerGobackClick=()=>{

  }
  handlerGohomeClick=()=>{
    
  }
  render() {
    
    const { serverTime,dateY,buyData,sellData,groupData ,groupAveragePrice
      ,dargStyle
      ,downDragStyle
    } =this.state
    return (
        <View className="Wrap">
          <NavBar
          background='#fff'
          back={false}
          home={false}
          // onBack={this.handlerGobackClick}
          // onHome={this.handlerGohomeClick}
          renderLeft={
            <View className='lxy-nav-bar-search'>
              <Image 
                src={appImg.LOGO}
                style='width:199rpx;height:54rpx ;margin-left:12Px'
              />
            </View>
          }
          renderRight={
            <View className='renderRight'>
               <View className="renderRight-L">
                 <Text>{serverTime.toDay || '-'}/{serverTime.mouth  || '-'}</Text>
                 <Text>{serverTime.week  || '-'}</Text>
               </View>
               <View className="renderRight-R">
                 <Text>{serverTime.year  || '--'}</Text>
               </View>
            </View>
          }
        />
         <View className='dragUpdataPage'>
                <View className='downDragBox' style={downDragStyle}>
                    <AtActivityIndicator  color='#00b388' size={32}></AtActivityIndicator>
                    <Text className='downText'>{this.state.downText}</Text>
                </View>
    <ScrollView  
        style={dargStyle}
        onTouchMove={this.touchmove}
        onTouchEnd={this.touchEnd}
        onTouchStart={this.touchStart}
        onScrollToUpper={this.ScrollToUpper}
        onScrollToLower={this.ScrollToLower}
        className='dragUpdata'
        scrollY={this.state.scrollY}
        scrollWithAnimation
        className='container discovery withtab'
      >
         
         <View className="Title-Item" style="justify-content: flex-start;">
           <Image src={appImg.HORIZONTALLINE} style="height:1pt;width:100%"/>
              <View style="flex:1;display:flex;align-items: center;justify-content: space-between" className="Padding-H">
                  <Text>普通茅台飞天53°（500ml）</Text>
                  <AtIcon value='menu' size='28' color='#white'></AtIcon>
              </View>
            <Image src={appImg.HORIZONTALLINE} style="height:1pt;width:100%"/>
         </View>

         <View className="Title-Item Padding-H">
            <Text style="flex:1;display:flex;align-items: center;">
              <Text>
                今日参考市场价格
                <Text>(贵州地区)</Text>
              </Text>
              </Text>
         </View>

         <View className="Today-Price">
              <View className='Today-Price-Cover'>
                <Image className='img' src={appImg.PRICEBG} />
              </View>
              <View className="Today-Top">
                  <Image className="Today-Icon" style='width: 18Px;height: 18Px;' src={appImg.PRICE}/>
                  <Text className="Today-Num">{groupAveragePrice && groupAveragePrice.todayAveragePrice ? groupAveragePrice.todayAveragePrice + 50 :'--'}</Text>
             </View>
             <View className="Today-Bottom">
                   <Text>{groupAveragePrice && groupAveragePrice.todayGroupAveragePriceIncrease}{`(${toPercent(groupAveragePrice.ratioOfGroupPurchasePrice)})`}</Text>
                    <Image className="Today-Icon" style='width: 11px;height: 12px;' 
                    src={groupAveragePrice &&  groupAveragePrice.ratioOfGroupPurchasePrice < 0 ? appImg.DECLINE :appImg.UP}/>
                    <Text className="Today-Num">比昨日零售价</Text>
             </View>
             
           {/* </Image> */}
         </View>
         {/* 价格说明 */}
         <View className="Today-Desc Padding-H">
           <Text className="Desc-Text">*该价格指数由  <Text className="Text-Num">{groupAveragePrice && groupAveragePrice.submitUserNumber ? groupAveragePrice.submitUserNumber + 100 :'--'}</Text> 位 </Text>
           <Text className="Desc-Text">茅台酒专业销售人士所提供数据统计分析而得，仅供参考。</Text>
         </View>
          {/* 昨日价格 */}
          <View className="Price-Total Padding-H">
             <Text className="To-Price">昨日市场零售价<Text className="To-Price-Active">(贵州市场)</Text></Text>
             <View className="Price-AP-Container">
               {/* 上 */}
               <View className="Price-AP">
                    <View className="Price-AP-L">
                        <Text>6:00am</Text>
                        <Image src={appImg.VERTICALLINE}/>
                        <Text>11:59am</Text>
                    </View>
                    <View className="Price-AP-R  Border-Right">
                          <View className="Price-AP-R-T">
                            <Text>早市价 </Text>
                            <Text>17/9</Text>
                          </View>
                          <View className="Price-AP-R-B">
                          <View className="Price-AP-R-B-C">
                            <Image className="Today-Icon" style='width: 14px;height: 14px;' src={appImg.PRICE}/>
                              <Text>{groupAveragePrice && groupAveragePrice.yesterdayMorningAverageGroupPrice ? groupAveragePrice.yesterdayMorningAverageGroupPrice:'--' }</Text>
                          </View>
                          </View>
                    </View>
               </View>
                {/* 下 */}
                <View className="Price-AP">
                    <View className="Price-AP-L">
                        <Text>12:00am</Text>
                        <Image src={appImg.VERTICALLINE}/>
                        <Text>18:00am</Text>
                    </View>
                    <View  className="Price-AP-R">
                          <View className="Price-AP-R-T">
                            <Text>晚市价 </Text>
                            <Text>17/9</Text>
                          </View>
                          <View className="Price-AP-R-B">
                              <View className="Price-AP-R-B-C">
                                  <Image className="Today-Icon" style='width: 14px;height: 14px;'  src={appImg.PRICE}/>
                                  <Text>{groupAveragePrice && groupAveragePrice.yesterdayAfternoonAveragePrice ? groupAveragePrice.yesterdayAfternoonAveragePrice + 50 : '--'}</Text>
                              </View>
                          </View>
                    </View>
               </View>
             </View>
         </View>

          <View className="Submit-Container">
            <View className="Submit-Item">
              {/* 进货价 */}
              <View className="Item-Fix">
                    <Text className="top desc">进货价</Text>
                    <Text className="bottom desc">BUYING PRICE</Text>
              </View>
              <View className="Input-Container">
              <Input
                type="digit"
                name="mobile"
                maxLength={5}
                placeholder="*请填写您知道的售价 可查询今日相关信息"
                placeholderClass="input-p"
                value={this.state.purchasePrice }
                // onInput={this.getMobile}
                onChange={(e)=>{
                    this.setState({
                      purchasePrice:e.detail.value
                    },()=>{
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
                    <Text className="bottom desc">SELLING PRICE</Text>
              </View>
              <View className="Input-Container">
              <Input
                type="digit"
                name="mobile"
                maxLength={5}
                placeholderClass="input-p"
                placeholder="*请填写您知道的售价 可查询今日相关信息"
                value={this.state.sellingPrice  }
                // onInput={this.getMobile}
                onChange={(e)=>{
                    this.setState({
                      sellingPrice:e.detail.value
                    },()=>{
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
                    <Text className="bottom desc">GROUP BUYING</Text>
              </View>
              <View className="Input-Container">
              <Input
                type="digit"
                name="mobile"
                maxLength={5}
                placeholder="*请填写您知道的售价 可查询今日相关信息"
                placeholderClass="input-p"
                value={this.state.groupPrice  }
                // bindinput="bindKeyInput"
                onChange={(e)=>{
                    this.setState({
                      groupPrice:e.detail.value
                    },()=>{
                      this.handleCheckSataus()
                    })
                }}
               
                // onInput={this.getMobile}
              />
              </View>
            </View> 

            {/* <Button className="button" 
            onClick={this.handleClickToDetail}
            >
              提交<br/>SUBMIT
            </Button> */}
            <View className="button" onClick={this.handleSubmit}>
              <Image  src={ this.state.isCheckPass ?appImg.SUBACTIVE:appImg.SUBNOACTIVE}/>
            </View>
          </View>

            {/* 曲线走势图 */}
            {
              dateY && dateY.length >0 &&  buyData && buyData.length >0 &&  groupData && groupData.length >0 ?
            <View className="detail_charts">
          <View className="detail_chartsTitle">
            <Image 
              src={appImg.SEVENCHART}
              style='width:39rpx;height:27rpx'
            />
            <Text style='font-size:24rpx;color:#FEFFFF;margin-left:7rpx'>前15天价格曲线</Text>
          </View>
          {/* {
              groupData && buyData && sellData ? */}
          <View className="detail_chartsPanel">
            <View className="calc">
              {
                dateY && dateY.length > 0 &&  dateY.map((e,i)=>{
                 return <View className="calcList">
                  <Text>{e.toDay}/{e.mouth}</Text>
                  <Text>{e.week}</Text>
                  <Text>{e.weekAlias}</Text>
                </View>
                })
              }
            </View>
            
      
            <View className="line-chart">
                <Chart
                  option={{
                    grid:{
                      left:0,
                      right:0,
                      top:0,
                      bottom:0
                    }
                    xAxis: {
                      type: 'category',
                      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                      data:dateY
                    },
                    yAxis: {
                      type: 'value',
                      show:true
                    },
                    
                    series: [
                      {
                      data: buyData,
                      type: 'line' ,
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
                      areaStyle: {},
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
                          position: 'top',
                          color: '#FF8A00'
                        }
                      },
                    }
                    ]
                  }}
                />
            </View>

          </View> 
        </View>:
            <View></View>
                }
        {
              dateY && dateY.length >0 &&  buyData && buyData.length >0 &&  groupData && groupData.length >0 ?
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
        </View>:
        <View></View>
        }
         {/* 各地参考价啊 */}
         <View className="CK-Price-Container">
              <View className="CK-Price-Title Padding-H ">
                 <Text className="CK-Price-TitleContent">各地价格参考</Text>
              </View>
              <View className="CK-Price-Items">
                {
                  CityPrice && CityPrice.length > 0 && CityPrice.map((e,i)=>{
                      return (
                        <View className="CK-Price-Item">
                             <View className="CK-Price-Item-T">
                                <Text className="big">{e.city}</Text>
                                <Text className="small">{e.alias}</Text>
                             </View>
                             <View className="CK-Price-Item-B">
                                <Text className="bigX">￥{e.price}</Text>
                                <Text  className="small date">
                                {serverTime.year || '--'}/{serverTime.mouth  || '--' }/{serverTime.toDay  || '--'}
                                {/* {e.date} */}
                                </Text>
                             </View>
                        </View>
                      )
                  })
                }
               
              </View>
         </View>
         </ScrollView>
        </View>
        </View>
      
        
    )
  }
/**
 * @name: by1773
 * @test: test font
 * @msg: 点击进入详情的方法
 * @param {type} 
 * @return: 
 */  
handleSubmit():void  {
  
  // return
  const { groupPrice,
          purchasePrice ,
          sellingPrice  ,isCheckPass} =this.state
  if(!isCheckPass) return
  const param = {
    groupPrice,
    purchasePrice,
    sellingPrice,
    submitUserCode :this.props.code || ''
  }

 this.props.dispatch({
    type: 'index/addQuot',
    payload: {
     ...param,
      method:'POST'
    }
  }).then((res)=>{
      if(res.success){
         this.setState({
          groupPrice:null,
          purchasePrice:null,
          sellingPrice:null,
          isCheckPass:false
         })
         Taro.navigateTo({
          url:'/pages/detail/index'
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

 handleCheckSataus=()=>{
  const { groupPrice,
    purchasePrice ,
    sellingPrice  } =this.state

    if(groupPrice && purchasePrice && sellingPrice){
       this.setState({
         isCheckPass:true
       })
    }else{
      this.setState({
        isCheckPass:false
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

handleGetServerTime=()=>{
    this.props.dispatch({
      type: 'index/getNowTime',
      payload: {
        method:'GET'
      }
    }).then((res)=>{
        if(res.success){
          this.setState({
            serverTime:DateFormat(res.currentTime)
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
 
 handleGetIndexStatistics=()=>{
   this.props.dispatch({
     type: 'index/getIndexStatistics',
     payload: {
      days:15,
      typeOfWine:'maotaifeitian',
       method:'POST'
     }
   }).then((res)=>{
     let dateArr:Array <any>= []
     if(res.success){
       let date = res.result[0]
       console.log(res.result[0])
       date.map((e,i)=>{
         dateArr.push(DateFormat(e))
       })
       this.setState({
        dateY:dateArr ,
        buyData:res.result[1],
        sellData:res.result[2] ,
        groupData:res.result[3],
       })

       console.log(this.state)
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
 
 getIndexGroupAveragePrice=()=>{
  this.props.dispatch({
    type: 'index/getIndexGroupAveragePrice',
    payload: {
     typeOfWine:'maotaifeitian',
     method:'GET'
    }
  }).then((res)=>{
    console.log(res)
      if(res.success){
        this.setState({
          groupAveragePrice:res.result
        })
      }
  })
}

reduction() {//还原初始设置
  const time = 0.5;
  this.setState({
      upDragStyle: {//上拉图标样式
          height: 0 + 'px',
          transition: `all ${time}s`
      },
      dargState: 0,
      dargStyle: {
          top: 0 + 'px',
          transition: `all ${time}s`
      },
      downDragStyle: {
          height: 0 + 'px',
          transition: `all ${time}s`
      },
      scrollY:true
  })
  setTimeout(() => {
      this.setState({
          dargStyle: {
              top: 0 + 'px',
          },
          upDragStyle: {//上拉图标样式
              height: 0 + 'px'
          },
          pullText: '上拉加载更多',
          downText: '下拉刷新'
      })
  }, time * 1000);
}
touchStart(e) {
  this.setState({
      start_p: e.touches[0]
  })
}
touchmove(e) {
let that = this
  let move_p = e.touches[0],//移动时的位置
      deviationX = 0.30,//左右偏移量(超过这个偏移量不执行下拉操作)
      deviationY = 70,//拉动长度（低于这个值的时候不执行）
      maxY = 100;//拉动的最大高度

  let start_x = this.state.start_p.clientX,
      start_y = this.state.start_p.clientY,
      move_x = move_p.clientX,
      move_y = move_p.clientY;


  //得到偏移数值
  let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y);
  if (dev < deviationX) {//当偏移数值大于设置的偏移数值时则不执行操作
      let pY = Math.abs(move_y - start_y) / 3.5;//拖动倍率（使拖动的时候有粘滞的感觉--试了很多次 这个倍率刚好）
if (move_y - start_y > 0) {//下拉操作
  if (pY >= deviationY) {
    this.setState({ dargState: 1, downText: '释放刷新' })
  } else {
    this.setState({ dargState: 0, downText: '下拉刷新' })
  }
  if (pY >= maxY) {
    pY = maxY
  }
  this.setState({
    dargStyle: {
      top: pY + 'px',
    },
    downDragStyle: {
      height: pY + 'px'
    },
    scrollY:false//拖动的时候禁用
  })
}
if (start_y - move_y > 0) {//上拉操作
  console.log('上拉操作')
  if (pY >= deviationY) {
    this.setState({ dargState: -1, pullText: '释放加载更多' })
  } else {
    this.setState({ dargState: 0, pullText: '上拉加载更多' })
  }
  if (pY >= maxY) {
    pY = maxY
  }
  this.setState({
    dargStyle: {
      top: -pY + 'px',
    },
    upDragStyle: {
      height: pY + 'px'
    },
    scrollY: false//拖动的时候禁用
  })
}

  }
}
pull() {//上拉
console.log('上拉')
  // this.props.onPull()
}
down() {//下拉
// console.log('下拉')
  // this.props.onDown()
    this.handleGetServerTime()
    this.handleGetIndexStatistics()
    this.getIndexGroupAveragePrice()
}
ScrollToUpper() { //滚动到顶部事件
console.log('滚动到顶部事件')
  // this.props.Upper()
}
ScrollToLower() { //滚动到底部事件
console.log('滚动到底部事件')
  // this.props.Lower()
}
touchEnd(e) {
  if (this.state.dargState === 1) {
      this.down()
  } else if (this.state.dargState === -1) {
      this.pull()
  }
  this.reduction()
}
}


export default Index
