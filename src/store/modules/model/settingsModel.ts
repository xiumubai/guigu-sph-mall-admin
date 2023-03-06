/*
 * @Description: 设置方面的类型
 * @Autor: codeBo
 * @Date: 2023-03-01 10:53:25
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-03-06 14:50:25
 */
/* AuthState */

export interface themeType {
  key: string
  val: string | boolean
}

export interface SettingsState {
  collapse: boolean
  refresh: boolean
  themeConfig: Record<string, string | boolean>
}
