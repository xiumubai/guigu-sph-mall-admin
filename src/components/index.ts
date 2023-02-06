import type { App, Component } from 'vue'

import { SvgIcon } from './SvgIcon'
const Components: {
  [propName: string]: Component
} = { SvgIcon }

export default {
  install: (app: App) => {
    Object.keys(Components).forEach((key) => {
      app.component(key, Components[key])
    })
  },
}
