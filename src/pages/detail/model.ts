/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-17 13:54:16
 */
// import Taro from '@tarojs/taro';
import * as indexApi from './service';

export default {
  namespace: 'index',
  state: {
    data:[],
    v:'1.0',
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
