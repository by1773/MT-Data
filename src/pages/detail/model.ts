/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-20 20:13:59
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
      const { error, result} = yield call(detailApi.getAverage,{
        ...payload
      })
      console.log('数据接口返回',result);
      
      if (!error) {
        return result
      }
    },

    *getStatistics({ payload },{select, call, put}){
      const { error, result} = yield call(detailApi.getStatistics,{
        ...payload
      })
      console.log('数据接口返回',result);
      
      if (!error) {
        return result
      }
    }

  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  }

}
