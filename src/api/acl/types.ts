export interface PageParams {
  page: number
  limit: number
}

export interface SearchUserParams extends PageParams {
  username: string
  nickName: string
}

// * 分页响应参数
export interface UserPageRes<T> {
  list: T[]
  pageNum: number
  pageSize: number
  total: number
}

// * 用户管理模块
export namespace AclUser {
  export interface ResUserList {
    id: string
    username: string
    gender: string
    user: {
      detail: {
        age: number
      }
    }
    idCard: string
    email: string
    address: string
    createTime: string
    status: number
    avatar: string
    children?: ResUserList[]
  }
}
