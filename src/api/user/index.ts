import http from '@/utils/http'
import type { LoginData, LoginRes, UserRes } from './types'

/**
 * 登录
 */
export function login(data: LoginData) {
  return http.post<LoginRes>('/admin/acl/index/login', data)
}

/**
 * 获取登录用户信息
 */
export function getUserInfo() {
  return http.get<UserRes>('/admin/acl/index/info')
}

/**
 * 退出登陆
 */
export function logout() {
  return http.post('/admin/acl/index/logout')
}
