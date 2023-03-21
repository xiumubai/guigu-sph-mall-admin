/*
 * @Author: 朽木白
 * @Date: 2023-03-20 10:32:49
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-21 09:27:19
 * @Description: 品牌接口
 */

import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import type { Trademark } from './types'
/**
 * @description:  获取品牌列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getTrademarkList(params: ReqPage) {
  return http.get<Trademark.ResTradeMarkList>(
    `/admin/product/baseTrademark/${params.pageNum}/${params.pageSize}`,
  )
}

/**
 * @description: 根据id删除品牌
 * @param {number} id
 * @returns {*}
 */
export function removeTrademark(id: number) {
  return http.delete<PageRes<any>>(`/admin/product/baseTrademark/remove/${id}`)
}

/**
 * @description: 新增品牌
 * @param {Trademark} data
 * @returns {*}
 */
export function addTrademark(data: Trademark.ReqTradeMark) {
  return http.post<PageRes<any>>(`/admin/product/baseTrademark/save`, data)
}

/**
 * @description: 修改品牌
 * @param {Trademark} data
 * @returns {*}
 */
export function updateTrademark(data: Trademark.ReqTradeMark) {
  return http.post<PageRes<any>>(`/admin/product/baseTrademark/update`, data)
}
