/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 18:02:49
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-21 19:38:18
 */
import Api from '../../utils/request'

export const getAverage = (data) => {

  return Api.getAverage(data)

}

export const getStatistics = (data) => {

  return Api.getStatistics(data)

}