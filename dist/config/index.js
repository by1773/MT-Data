'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * @Descripttion:
 * @version:
 * @Author: by1773
 * @Date: 2019-09-17 13:54:16
 * @LastEditors: by1773
 * @LastEditTime: 2019-09-17 16:06:25
 */
var ONLINEHOST = exports.ONLINEHOST = 'https://api.apiopen.top';
/**
 * mock 接口p
 * */
var MOCKHOST = exports.MOCKHOST = 'https://api.apiopen.top';
/**
 * 是否mock
*/
var ISMOCK = exports.ISMOCK = true;
/**
 * 当前的host  ONLINEHOST | QAHOST | MOCKHOST
 */
var MAINHOST = exports.MAINHOST = ONLINEHOST;
/**
 * 这是一个全局的分享信息 不用每一个都去写
 */
var SHAREINFO = exports.SHAREINFO = {
  'title': '分享标题',
  'path': '路径',
  'imageUrl': '图片'
};