import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Button,Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { IndexProps, IndexState } from './index.interface'
import './index.scss'
import * as appImg  from '../../assets/images/index'


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
    if(res){
     setTimeout(()=>{
      Taro.navigateTo({
        url:'/pages/index/index'
      })
     },1000)
    }
  }



  tobegin = (userInfo) => {

    console.log(userInfo);


  };
  render() {
    console.log(this.props);
    
    return (
      <View className='fx-index-wrap'>
           <View className="index-top">
              <Image className="logo" src={appImg.TPLOGO}/>
              <Image   className="load" src={appImg.LOADICON}/>
              <Text className="loadtxt">Loading...</Text>
           </View>
           <View  className="index-bottom">
               <Image   className="info" src={appImg.BTINFO}/>
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
