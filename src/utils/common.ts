/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-21 21:04:37
 */
/** 
 * 共用函数
*/
import Taro,{ Component } from "@tarojs/taro";
export const repeat = (str = '0', times) => (new Array(times + 1)).join(str);
// 时间前面 +0 
export const pad = (num, maxLength = 2) => repeat('0', maxLength - num.toString().length) + num;

// 全局的公共变量
export let globalData: any = {

}

// 时间格式装换函数

export const formatTime = time => {
    `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}.${pad(time.getMilliseconds(), 3)}`
}

export const DateFormat = (date) =>{
  if(!date) return null
  let [ week,year,mouth,weekAlias,toDay] = ['', 0, '','',0];
  let dates = new Date(date)
  const day=dates.getDay();
  toDay = dates.getDate()
  year = dates.getFullYear() ;
  if(dates.getMonth() +1 < 10){
    mouth = `0${dates.getMonth() +1}`;
  }else{
    mouth = `${dates.getMonth() +1}`;
  }
  
    if(day==0){
      week="星期日";
      weekAlias='SUN'
    }
    else if(day==1){
      week="星期一";
      weekAlias='MON'
    }
    else if (day == 2) {
      week = "星期二";
      weekAlias='TUE'
    }
    else if (day == 3) {
      week = "星期三";
      weekAlias='WES'
    }
    else if (day == 4) {
      week = "星期四";
      weekAlias='THU'
    }
    else if (day == 5) {
      week = "星期五";
      weekAlias='FRI'
    }
    else if (day == 6) {
      week = "星期六";
      weekAlias='STA'
    }

    return {
      week,year,mouth,weekAlias,toDay
    }
}

  /**
   * @name: by1773
   * @test: 小数转百度数
   * @msg: 
   * @param {type} 
   * @return: 
   */  
  export const  toPercent=(point)=>{
    // console.log(point)
    if(!point) return `--%`
    var str=Number(point*100).toFixed(1);
    str+="%";
   
    return str;
}