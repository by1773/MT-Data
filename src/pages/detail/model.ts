/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-21 19:38:40
 */
// import Taro from '@tarojs/taro';
import * as detailApi from './service';

export default {
  namespace: 'detail',
  state: {
    data:[],
    v:'1.0',
  },

  effects: {
    *getAverage({ payload },{select, call, put}){
      const data= yield call(detailApi.getAverage,{
        ...payload
      })
      console.log('数据接口返回',data);
      return data
      // if (!error) {
      //   return data
      // }
    },

    *getStatistics({ payload },{select, call, put}){
      const data = yield call(detailApi.getStatistics,{
        ...payload
      })
      console.log('数据接口返回',data);
      
      // if (!error) {
        return data
      // }
    }

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  }

}
