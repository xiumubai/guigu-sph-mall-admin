import type { App, Component } from 'vue'

import { SvgIcon } from './SvgIcon'
const Components: {
  [propName: string]: Component
} = { SvgIcon }

export const registerGlobComp = (app: App) => {
  Object.keys(Components).forEach((key) => {
    app.component(key, Components[key])
  })
}
