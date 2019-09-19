import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Button} from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
import Tips from '../../utils/tips'
import { IndexProps, IndexState } from './index.interface'
import './index.scss'
// import {  } from '../../components'

import { F2Canvas } from 'taro-f2'
import F2 from '@antv/f2'


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
    navigationBarTitleText: 'MT Data'
  }
  constructor(props: IndexProps) {
    super(props)
    this.state = {
      RenderData:[]
    }
  }

  async getList() {
    await this.props.dispatch({
      type: 'index/getList',
      payload: {}
    })
  }

  componentWillMount(){
    Tips.loding()
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


    let res = await Taro.login();
    console.log(res)
  }

  drawRadar(canvas, width, height){
    //  雷达图
    // ⚠️ 别忘了这行
    // 为了兼容微信与支付宝的小程序，你需要通过这个命令为F2打补丁
    // F2Canvas.fixF2(F2);

    const data = [
      { name: '超大盘能力', value: 6.5 },
      { name: '抗跌能力', value: 9.5 },
      { name: '稳定能力', value: 9 },
      { name: '绝对收益能力', value: 6 },
      { name: '选证择时能力', value: 6 },
      { name: '风险回报能力', value: 8 }
    ];
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
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
    chart.area()
      .position('name*value')
      .color('#FE5C5B')
      .style({
        fillOpacity: 0.2
      })
      .animate({
        appear: {
          animation: 'groupWaveIn'
        }
      });
    chart.line()
      .position('name*value')
      .color('#FE5C5B')
      .size(1)
      .animate({
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

  drawRadar2(canvas, width, height){
    // 柱状图
    // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    let data= this.state.RenderData

    // Step 1: 创建 Chart 对象
  console.log(data)
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
  if(!data) return
    // Step 2: 载入数据源
    chart.source(data,{
      sales: {
        tickCount: 1 // 刻度
      }
    });

    // chart.point().shape('type'); // 指定形状

    chart.tooltip({
      showTitle: true, // 是否展示标题，默认不展示
      showCrosshairs: true, // 是否显示辅助线，点图、路径图、线图、面积图默认展示
      showTooltipMarker: true, // 是否显示 tooltipMarker
      showItemMarker: false,
      background: {
        radius: 2,
        fill: '#1890FF',
        padding: [3, 5]
      },
      tooltipMarkerStyle: {
        fill: '#1890FF',
        fillOpacity: 0.1
      },
      
    })

    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval().position('genre*sold').color('sold', '#FFFFFF-#1890FF');
    // chart.interval().position('genre*sold');


    // 柱状图添加文本
  data.map(function(obj) {
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


  tobegin = (userInfo) => {

    console.log(userInfo);


  };
  render() {
    console.log(this.props);
    
    return (
      <View className='fx-index-wrap'>
          {/* <Button className="btn" openType="getUserInfo" onGetUserInfo={this.tobegin} type="primary">
            开启授权
          </Button> */}
           <View className='user-login'>
                <Button className="btn" openType="getUserInfo" onGetUserInfo={this.tobegin} type="primary">
                  开启微信授权登录
                </Button> 
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
handleClickToDetail():void  {
  Taro.navigateTo({
    url:'/pages/detail/index'
  })

}
}



export default Index
