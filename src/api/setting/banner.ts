/*
 * @Author: 朽木白
 * @Date: 2023-03-21 10:32:06
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-21 15:06:13
 * @Description: banner管理
 */
import http from '@/utils/http'
import type { PageRes, ReqPage } from '../types'
import { Banner } from './types'
/**
 * @description:  获取活动列表
 * @param {ReqPage} params
 * @returns {*}
 */
export function getBannerList(params: ReqPage) {
  return http.get<PageRes<Banner.ResBannerList>>(
    `/admin/cms/banner/${params.pageNum}/${params.pageSize}`,
  )
}
