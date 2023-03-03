/*
 * @Author: 朽木白
 * @Date: 2023-02-03 14:54:34
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-03 16:44:59
 * @Description:http请求枚举值
 */

/**
 * @description: 响应结果
 * @argument SUCCESS
 * @argument OVERDUE token请求失效
 * @argument ERROR
 * @argument TIMEOUT
 * @argument TYPE
 */
export enum ResultEnum {
  SUCCESS = 20000,
  OVERDUE = 20001,
  ERROR = -1,
  ERRMESSAGE = '请求错误',
  TIMEOUT = 25000,
  TYPE = 'success',
}
