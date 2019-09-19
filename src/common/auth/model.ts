/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-18 13:46:23
 */
// import Taro from '@tarojs/taro';
// import * as indexApi from './service';

export default {
  namespace: 'auth',
  state: {
    baseURL : 'https://xx.xxx.xx/' ,
    //应用首次加载
    appOnLaunch : true ,
    //请求token
    authorize : ''
  },

  effects: {
    *getList({ payload },{select, call, put}){
      const { error, result} = yield call(indexApi.getList,{
        ...payload
      })
      console.log('数据接口返回',result);
      
      if (!error) {
        yield put({
          type: 'save',
          payload: {
            data:result
          },
        })
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  }

}


const INITIAL_STATE ={
    //请求接口域名地址
    baseURL : 'https://xx.xxx.xx/' ,
    //应用首次加载
    appOnLaunch : true ,
    //请求token
    authorize : ''
}

function app( state = INITIAL_STATE , action ){
    switch (action.type){
        case constants.CHANGE_APP_ON_LAUNCH :
            return {
                ...state ,
                appOnLaunch : false
            };
        case constants.INSERT_AUTHORIZE :
            return {
                ...state ,
                authorize : action.authorize
            };
        default :
            return state;
    }
}
