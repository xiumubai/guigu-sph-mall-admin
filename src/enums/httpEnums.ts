/*
 * @Author: 朽木白
 * @Date: 2023-02-03 14:54:34
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-10 15:09:02
 * @Description:http请求枚举值
 */

/**
 * @description: 响应结果
 * @argument SUCCESS  请求成功
 * @argument EXPIRE   token请求失效或校验失败
 * @argument ERROR    请求错误
 * @argument TIMEOUT  请求超时
 * @argument TYPE     请求类型
 */
export enum ResultEnum {
  SUCCESS = 200,
  EXPIRE = 203,
  ERROR = -1,
  ERRMESSAGE = '请求失败',
  TIMEOUT = 25000,
  TYPE = 'success',
}
