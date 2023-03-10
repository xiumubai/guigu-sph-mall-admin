import type { ReqPage } from '../types'

export interface Roles {
  deleted?: boolean
  gmtCreate?: string
  gmtModified?: string
  id: string
  remark?: null
  roleName: string
}
// * 用户管理模块
export namespace AclUser {
  export interface ReqAclUserListParams extends ReqPage {
    username?: string
  }
  export interface ReqAclAddUser {
    username: string
    nickName?: string
    password: string
  }
  export interface ReqAssignRoles {
    userId: string
    roleIdList: string
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
  export interface ResUserRolesList {
    allRolesList: Roles[]
    assignRoles: Roles[]
  }
}

export namespace Role {
  export interface ReqRoleListParams extends ReqPage {
    roleName?: string
  }

  export interface ResRoleList {
    deleted?: boolean
    gmtCreate?: string
    gmtModified?: string
    id: string
    remark?: any
    roleName: string
  }
}
