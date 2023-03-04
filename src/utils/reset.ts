/*
 * @Author: 朽木白
 * @Date: 2023-03-03 16:41:20
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-04 10:04:55
 * @Description: 重置用户信息
 */
import { useUserStore } from '@/store/modules/user'
import { useAuthStore } from '@/store/modules/auth'
export function RESEETSTORE() {
  const userStore = useUserStore()
  const authStore = useAuthStore()

  userStore.$reset()
  authStore.$reset()
  localStorage.clear()
}
