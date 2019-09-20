/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-20 21:45:01
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

export const NetTime = async ( )=>{
    const res = await Taro.request();
    console.log(res)


    
    // Emulate the XMLHttpRequest() constructor in IE5 and IE6
    console.log(window.XMLHttpRequest)
    if (window.XMLHttpRequest === undefined) {
    　　window.XMLHttpRequest = function() {
   　　 try {
        　　// Use the latest version of the ActiveX object if available
        　　return new ActiveXObject("Msxml2.XMLHTTP.6.0");
   　　 }catch (e1) {
        　　try {
            　　　　　　// Otherwise fall back on an older version
            　　　　　　return new ActiveXObject("Msxml2.XMLHTTP.3.0");
            　　　　} catch(e2) {
            　　　　　　// Otherwise, throw an error
        　　　　 　　throw new Error("XMLHttpRequest is not supported");
            　　　　}
            　　}
            };
        }
        var xhr = new XMLHttpRequest();  
            xhr.open("HEAD",location.href,true);  
            xhr.onreadystatechange=function(){  
        if( xhr.readyState == 4 && xhr.status == 200 ){  
         console.log(dateTimeFormate(xhr.getResponseHeader("Date")));  
        }  
    }  
         xhr.send(null); 
}


export const  dateTimeFormate=(date)=>{
    if(!date){
      return
    }else{
      var d = new Date(date);
      var year = d.getFullYear();
      var month = ('0' + (d.getMonth() + 1)).slice(-2);
      var day = ('0' + (d.getDate())).slice(-2);
      var hour = ('0' + (d.getHours())).slice(-2);
      var minutes = ('0' + (d.getMinutes())).slice(-2);
      var seconds = ('0' + (d.getSeconds())).slice(-2);
      return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    }
  }



  /**
   * @name: by1773
   * @test: 小数转百度数
   * @msg: 
   * @param {type} 
   * @return: 
   */  
  export const   toPercent=(point)=>{
    var str=Number(point*100).toFixed(1);
    str+="%";
    return str;
}