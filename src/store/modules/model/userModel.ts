/**
 * @description: Login interface parameters
 */

import type { UserInfo } from '@/types/store'
export interface LoginParams {
  username: string
  password: string
}

export interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
}
