/*
 * @Author: 朽木白
 * @Date: 2023-03-03 15:58:03
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-03 16:29:26
 * @Description: 用户权限相关的接口
 */

import http from '@/utils/http'
import type {
  SearchUserParams,
  PageParams,
  UserPageRes,
  AclUser,
} from './types'

const USER_PRIFIX = '/admin/acl/user'

/**
 * 获取后台用户分页列表(带搜索)
 */
export function getAclUserList(
  pageParams: PageParams,
  searchParams: SearchUserParams,
) {
  return http.get<UserPageRes<AclUser.ResUserList>>(
    `${USER_PRIFIX}/${pageParams.page}/${pageParams.limit}`,
    { params: searchParams },
  )
}
