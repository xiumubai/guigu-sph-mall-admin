/*
 * @Author: 朽木白
 * @Date: 2023-03-10 11:31:11
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-13 11:47:26
 * @Description: 权限接口
 */
import http from '@/utils/http'
import type { PageRes } from '../types'
import type { Permission } from './types'

/**
 * @description 查看某个角色权限列表
 * @param { string } id
 * @returns {<PageRes<any>>}
 */
export function getRolePermission(roleId: string | number) {
  return http.get<PageRes<Permission.ResPermisionList[]>>(
    `/admin/acl/permission/toAssign/${roleId}`,
  )
}

/**
 * @description 给某个角色分配权限
 * @param { Permission.ReqAssignPermision } data
 * @returns {<PageRes<any>>}
 */
export function assignRolePermission(data: Permission.ReqAssignPermision) {
  return http.post<PageRes<any>>(
    `/admin/acl/permission/doAssign`,
    {},
    { params: data },
  )
}
