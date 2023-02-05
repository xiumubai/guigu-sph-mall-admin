import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig((config) => {
  const { command, mode } = config
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env.VITE_APP_TITLE)

  return {
    base: './',
    plugins: [
      vue(),
      viteMockServe({
        // 只在开发阶段开启 mock 服务
        localEnabled: command === 'serve',
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
})
