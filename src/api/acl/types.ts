import type { ReqPage } from '../types'

// * 用户管理模块
export namespace AclUser {
  export interface ReqAclUserListParams extends ReqPage {
    username?: string
    nickName?: string
  }
  export interface ResAclUserList {
    deleted: boolean
    gmtCreate: string
    gmtModified: string
    id: string
    nickName: string
    password: string
    roleName: string
    salt: null
    token: null
    username: string
  }
}
