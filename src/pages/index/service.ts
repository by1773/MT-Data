/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-21 15:07:27
 */
import Api from '../../utils/request'

export const getList = (data) => {

  return Api.getList(data)

}
  
export const addQuot = (data) => {

  return Api.addQuot(data)

}

export const getNowTime = (data) => {

  return Api.getNowTime(data)

}

export const getIndexStatistics = (data) => {

  return Api.getIndexStatistics(data)

}

export const getIndexGroupAveragePrice = (data) => {

  return Api.getIndexGroupAveragePrice(data)

}



