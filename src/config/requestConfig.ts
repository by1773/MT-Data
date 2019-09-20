/*
 * @Descripttion: 
 * @version: 
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-20 19:57:36
 */
import index from "../pages/index/config"; // index的接口
import detail from "../pages/detail/config" // detail的接口


/** 
 * 请求公共参数
*/
export const commonParame = {}

/** 
 * 请求的映射文件
*/

export const requestConfig = {
    loginUrl:'/api/user/wechat-auth', // 微信的登陆接口
    ...index,
    ...detail
}
