/*
 * @Author: 朽木白
 * @Date: 2023-03-21 10:32:06
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-21 14:49:58
 * @Description: 会员管理
 */
import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import { ClientUser } from './types'
/**
 * @description:  获取活动列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getClientUserList(params: ReqPage) {
  return http.get<PageRes<ClientUser.ResClientUserList>>(
    `/admin/user/${params.pageNum}/${params.pageSize}`,
    params,
  )
}

/**
 * @description:  获取活动列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function lockClientUser(params: { id: number; status: number }) {
  return http.get<PageRes<any>>(
    `/admin/user/lock/${params.id}/${params.status}`,
  )
}
