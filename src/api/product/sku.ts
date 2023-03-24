/*
 * @Author: 朽木白
 * @Date: 2023-03-18 11:06:15
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-24 14:28:34
 * @Description: 商品属性相关的接口
 */

import http from '@/utils/http'
import type { ReqPage } from '../types'
import { Sku } from './types'

/**
 * @description:  获取品牌列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getSkuList(params: ReqPage) {
  return http.get<Sku.ResSkuList>(
    `/admin/product/list/${params.pageNum}/${params.pageSize}`,
  )
}
