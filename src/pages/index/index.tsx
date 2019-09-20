import Taro, { Component, Config } from '@tarojs/taro'
import {View, Text, Input, Button,Image  } from '@tarojs/components'
import * as indexApi from './service';
import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
import Tips from '../../utils/tips'
import { IndexProps, IndexState } from './index.interface'
import './index.scss';

import NavBar from 'taro-navigationbar';
import * as appImg  from '../../assets/images/index'
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
    }
  }

  async getList() {
    await this.props.dispatch({
      type: 'index/getList',
      payload: {}
    })
  }

  componentWillMount(){
    console.log(appImg)
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

  async componentDidMount() {
  
    this.getList()
    let arr:Array<any>=[]
    let result = this.props.data
    result && result.map((e,i)=>{
      const obj = {
        genre:e.name,
        sold:Math.random() * 100
      }
      arr.push(obj)
    })
    this.setState({
      RenderData:arr
    })

    const chartData = {
      barData: [709,1917,2455,2610,1719,1433,1544,3285,5208,3372,2484,4078],
      lineData: [1036,3693,2962,3810, 2519,1915,1748, 4675, 6209,4323,2865,4298]
    };
    // this.addChart.refresh(chartData);
    let res = await Taro.login();
    console.log(res)
    Tips.loaded()
  }


  tobegin = (userInfo) => {

    console.log(userInfo);


  };
  refAddChart = (node) => this.addChart = node
  onShareAppMessage () {
    return {
      title: '各种图表在Taro中的使用',
      path:  'pages/index/index',
      imageUrl: 'http://img12.360buyimg.com/devfe/jfs/t1/20633/16/5554/7231/5c3f0272E1a342ec4/4ce472e34ad9a4cd.png'
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
    console.log(this.props);
    
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
                style='width:199rpx;height:54rpx'
              />
            </View>
          }

          renderRight={
            <View className='renderRight'>
               <View className="renderRight-L">
                 <Text>17/9</Text>
                 <Text>星期三</Text>
               </View>
               <View className="renderRight-R">
                 <Text>2019</Text>
               </View>
            </View>
          }
        />

         
         <View className="Title-Item" style="justify-content: flex-start;">
           <Image src={appImg.HORIZONTALLINE} style="height:1pt;width:100%"/>
              <Text style="flex:1;display:flex;align-items: center;" className="Padding-H">
                  <Text>普通茅台飞天53°（500ml）</Text>
              </Text>
            <Image src={appImg.HORIZONTALLINE} style="height:1pt;width:100%"/>
         </View>

         <View className="Title-Item Padding-H">
            <Text style="flex:1;display:flex;align-items: center;">
              <Text>
                今日市场价格
                <Text>(贵州地区)</Text>
              </Text>
              </Text>
         </View>

         <View className="Today-Price Padding-H">
           {/* <Image src={appImg.PRICEBG}> */}
             
             <View className="Today-Top">
                  <Image className="Today-Icon" style='width: 18Px;height: 18Px;' src={appImg.PRICE}/>
                  <Text className="Today-Num">2620.00</Text>
             </View>
             <View className="Today-Bottom">
                   <Text>-135.00（0.5%）</Text>
                    <Image className="Today-Icon" style='width: 11px;height: auto;' src={appImg.DECLINE}/>
                    <Text className="Today-Num">比昨日零售价</Text>
             </View>
             
           {/* </Image> */}
         </View>
         {/* 价格说明 */}
         <View className="Today-Desc Padding-H">
           <Text className="Desc-Text">*该价格指数由  <Text className="Text-Num">123</Text> 位 </Text>
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
                            <Image className="Today-Icon" style='width: 19px;height: 19px;' src={appImg.PRICE}/>
                              <Text>2580.20</Text>
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
                                  <Image className="Today-Icon" style='width: 19px;height: 19px;'  src={appImg.PRICE}/>
                                  <Text>2560.30</Text>
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


          {/* <View className="worldCloud-chart">
              <AddChart ref={this.refAddChart} />
            </View> */}
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
      }
  })
 
  // Taro.navigateTo({
  //   url:'/pages/detail/index'
  // })

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
}



export default Index
