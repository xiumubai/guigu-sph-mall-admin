import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import { Activity } from './types'
/**
 * @description:  获取活动列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getCouponList(params: ReqPage) {
  return http.get<PageRes<Activity.ResActivityList>>(
    `/admin/activity/couponInfo/${params.pageNum}/${params.pageSize}`,
  )
}
