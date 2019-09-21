import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Button,Image} from '@tarojs/components'
import './index.scss'
import * as appImg  from '../../assets/images/index'


class cityPrice extends Component{
 
  constructor(props) {
    super(props)
    this.state = {
      RenderData:[]
    }
  }


  componentWillMount(){
  }


  render() {
    return (
      <View className='fx-index-wrap'>
           {/* <View className="index-top">
              <Image src={appImg.TPLOGO}/>
              <Image src={appImg.LOADICON}/>
           </View>
           <View  className="index-bottom">
               <Image src={appImg.BTINFO}/>
           </View> */}
           <Text>7890-</Text>
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



export default cityPrice
