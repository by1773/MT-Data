/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-20 19:02:16
 */
import Api from '../../utils/request'

export const getList = (data) => {

  return Api.getList(data)

}
  
export const addQuot = (data) => {

  return Api.addQuot(data)

}