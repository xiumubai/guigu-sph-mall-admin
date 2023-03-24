/*
 * @Author: 朽木白
 * @Date: 2023-03-21 11:05:23
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-24 14:27:11
 * @Description: 优惠券接口
 */
import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import { Activity } from './types'
/**
 * @description:  获取优惠券列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getCouponList(params: ReqPage) {
  return http.get<PageRes<Activity.ResActivityList>>(
    `/admin/activity/couponInfo/${params.pageNum}/${params.pageSize}`,
  )
}

/**
 * @description: 根据id删除优惠券
 * @param {number} id
 * @returns {*}
 */
export function removeCoupon(id: number) {
  return http.delete<PageRes<any>>(`/admin/activity/couponInfo/remove/${id}`)
}
