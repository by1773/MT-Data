/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-24 11:59:58
 */
// export const ONLINEHOST = 'https://api.apiopen.top';
// http://172.16.2.9:8081/swagger-ui.html
// export const ONLINEHOST = 'http://172.16.2.13:8083/'; 
export const ONLINEHOST = 'https://wxapi.mt-spirit.com/'; 
/** 
/** 
 * mock 接口p
 * */ 
// export const MOCKHOST = 'https://api.apiopen.top';
// export const MOCKHOST = 'http://172.16.2.13:8083/';
export const MOCKHOST =  'https://wxapi.mt-spirit.com/'; 

/** 
 * 是否mock
*/

export const ISMOCK = false;


/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
export const MAINHOST = ONLINEHOST

/**
 * 这是一个全局的分享信息 不用每一个都去写
 */
export const SHAREINFO = {
    'title': '分享标题',
    'path': '路径',
    'imageUrl': '图片'
  } 