/*
 * @Author: 朽木白
 * @Date: 2023-03-18 11:06:15
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-22 15:08:17
 * @Description: 商品属性相关的接口
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import { Attr } from './types'

/**
 * @description: 获取指定分类下的属性列表
 * @returns {*}
 */
export function getAttrList(
  category1Id: number,
  category2Id: number,
  category3Id: number,
) {
  return http.get<PageRes<Attr.ResAttrList>>(
    `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  )
}

/**
 * @description: 根据id删除属性
 * @param {number} id
 * @returns {*}
 */
export function removeAttr(id: number) {
  return http.delete<PageRes<any>>(`/admin/product/deleteAttr/${id}`)
}

/**
 * @description: 新增/修改属性
 * @param {Attr.ReqAttrData} data
 * @returns {*}
 */
export function addAttr(data: Attr.ReqAttrData) {
  return http.post<PageRes<any>>(`/admin/product/saveAttrInfo`, data)
}
