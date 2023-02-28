/*
 * @Author: 朽木白
 * @Date: 2023-02-24 11:28:38
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-02-28 17:15:20
 * @Description: 系统设置
 */

import { defineStore } from 'pinia'
import { SettingsState } from './model/settingsModel'
export const useSettingsStore = defineStore({
  id: 'app-settings',
  state: (): SettingsState => ({
    collapse: false,
  }),

  actions: {
    changeCollapse() {
      this.collapse = !this.collapse
    },
  },
})
