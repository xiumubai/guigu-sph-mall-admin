/*
 * @Author: 朽木白
 * @Date: 2023-03-03 15:58:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-08 10:50:56
 * @Description: 用户权限相关的接口
 */

import http from '@/utils/http'
import type { PageRes } from '../types'
import type { AclUser } from './types'

/**
 * 获取后台用户分页列表(带搜索)
 */
export function getAclUserList(params: AclUser.ReqAclUserListParams) {
  console.log(params)

  return http.get<PageRes<AclUser.ResAclUserList>>(
    `/admin/acl/user/${params.pageNum}/${params.pageSize}`,
    { username: params.username },
  )
}
