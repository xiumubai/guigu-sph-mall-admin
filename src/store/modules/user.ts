/*
 * @Author: 朽木白
 * @Date: 2023-02-06 11:02:58
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-28 22:46:55
 * @Description: 用户store
 */
import { defineStore } from 'pinia'
import { getUserInfo, logout } from '@/api'
import type { UserState } from './model/userModel'
import type { UserInfo } from '@/api/user/types'
import { useAuthStore } from './auth'
export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: '',
    userInfo: null,
  }),
  actions: {
    // setToken
    setToken(token: string) {
      this.token = token
    },
    // setUserInfo
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    // 重置用户信息
    resetUser() {
      this.token = ''
      this.userInfo = null
    },
    async GetInfoAction() {
      try {
        const { data } = await getUserInfo()
        const { avatar, buttons, name, roles, routes } = data
        const authStore = useAuthStore()
        // 存储用户信息
        this.setUserInfo({ avatar, name })
        // 存储用户权限信息
        authStore.setAuth({ buttons, roles, routes })
      } catch (error) {
        Promise.reject(error)
      }
    },
    async Logout() {
      try {
        await logout()
        this.resetUser()
      } catch (error) {
        Promise.reject(error)
      }
    },
  },
  // 设置为true，缓存state
  persist: true,
})
