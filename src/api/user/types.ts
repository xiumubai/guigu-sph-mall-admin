/* 登录接口参数类型 */
export interface LoginData {
  username: string
  password: string
}

/* 登录接口返回值类型 */
export interface LoginRes {
  token: string
}

/* 用户信息接口返回值类型 */
export interface UserInfo {
  userId?: string
  name: string
  buttons: string[]
  roles: string[]
  routes: string[]
  avatar: string
}
