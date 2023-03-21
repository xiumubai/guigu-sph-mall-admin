/*
 * @Author: 朽木白
 * @Date: 2023-03-21 10:32:06
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-21 11:08:58
 * @Description: 活动接口
 */
import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import { Activity } from './types'
/**
 * @description:  获取活动列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getActivityList(params: ReqPage) {
  return http.get<PageRes<Activity.ResActivityList>>(
    `/admin/activity/activityInfo/${params.pageNum}/${params.pageSize}`,
  )
}
