/*
 * @Author: 朽木白
 * @Date: 2023-02-24 11:28:38
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-03-06 15:09:05
 * @Description: 系统设置
 */

import { defineStore } from 'pinia'
import { SettingsState, themeType } from './model/settingsModel'
import { DEFAULT_PRIMARY } from '@/config/config'
export const useSettingsStore = defineStore({
  id: 'app-settings',
  state: (): SettingsState => ({
    collapse: false,
    refresh: false, // 刷新页面
    themeConfig: {
      primary: DEFAULT_PRIMARY, // 主题颜色
      showTag: true, // 展示标签导航
      isDark: false, // 暗黑模式
    },
  }),

  actions: {
    // 设置注意
    setThemeConfig({ key, val }: themeType) {
      this.themeConfig[key] = val
    },
    changeCollapse() {
      this.collapse = !this.collapse
    },
    setRefresh() {
      this.refresh = !this.refresh
    },
  },
})
