import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Button,Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'
// import Api from '../../utils/request'
import Tips from '../../utils/tips'
import { IndexProps, IndexState } from './index.interface'
import './index.scss'
// import {  } from '../../components'
import * as appImg  from '../../assets/images/index'
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

class Loading extends Component<IndexProps,IndexState > {
  config:Config = {
    navigationBarTitleText: 'MT Data'
  }
  constructor(props: IndexProps) {
    super(props)
    this.state = {
      RenderData:[]
    }
  }


  componentWillMount(){
    // Tips.loding()
  }

   async componentDidMount() {
   

    let res = await Taro.login();
    console.log(res)
  }



  tobegin = (userInfo) => {

    console.log(userInfo);


  };
  render() {
    console.log(this.props);
    
    return (
      <View className='fx-index-wrap'>
           <View className="index-top">
              <Image src={appImg.TPLOGO}/>
              <Image src={appImg.LOADICON}/>
           </View>
           <View  className="index-bottom">
               <Image src={appImg.BTINFO}/>
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



export default Loading
