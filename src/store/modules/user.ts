import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api'
import { LoginParams } from './model/userModel'
import { localSet, localGet } from '@/utils/cache'
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
import type { UserState } from './model/userModel'
import type { UserInfo } from '@/types/store'
export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return (this.userInfo as UserInfo) || localGet(USER_INFO_KEY) || {}
    },
    getToken(): string {
      return (this.token as string) || localGet(TOKEN_KEY) || ''
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token ? token : ''
      localSet(TOKEN_KEY, token)
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info
      localSet(USER_INFO_KEY, info)
    },
    async login(params: LoginParams) {
      try {
        const data = await login(params)

        const { token } = data
        this.setToken(token)
        this.getUserInfoAction()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserInfoAction() {
      try {
        const data = await getUserInfo()
        this.setUserInfo(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
  },
})
