/*
 * @Author: 朽木白
 * @Date: 2023-03-21 11:27:00
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-21 11:31:42
 * @Description: 退款列表
 */

import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import { Refund } from './types'
/**
 * @description:  获取活动列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getRefundList(params: ReqPage) {
  return http.get<PageRes<Refund.ResRefundList>>(
    `/admin/order/orderRefundInfo/${params.pageNum}/${params.pageSize}`,
  )
}
