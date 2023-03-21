/*
 * @Author: 朽木白
 * @Date: 2023-03-21 11:26:50
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-21 11:31:25
 * @Description: 订单列表
 */

import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import { Order } from './types'
/**
 * @description:  获取活动列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getOrderList(params: ReqPage) {
  return http.get<PageRes<Order.ResOrderList>>(
    `/admin/order/${params.pageNum}/${params.pageSize}`,
  )
}
