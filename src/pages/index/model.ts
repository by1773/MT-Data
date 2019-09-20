/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-20 21:42:49
 */
// import Taro from '@tarojs/taro';
import * as indexApi from './service';

export default {
  namespace: 'index',
  state: {
    data:[],
    code:null,
    v:'1.0',
  },

  effects: {
    *addQuot ({ payload },{select, call, put}){
      console.log('payload,payload',payload)
      const result = yield call(indexApi.addQuot,{
        ...payload
      })
      console.log('数据接口返回',result);
      
      // if (!error) {
        return result
      // }
      // return null
    },
    *addCode ({ payload },{select, call, put}){
      yield put({
        type: 'save',
        payload,
      })
    },
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
