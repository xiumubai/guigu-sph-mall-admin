<!--
 * @Description: 暗黑模式
 * @Autor: codeBo
 * @Date: 2023-03-06 14:46:26
 * @LastEditors: gjzxlihaibo@163.com
 * @LastEditTime: 2023-03-06 15:28:43
-->
<template>
  <el-switch
    @change="switchDark"
    inline-prompt
    v-model="themeConfig.isDark"
    :active-icon="Sunny"
    :inactive-icon="Moon"
  />
</template>

<script setup lang="ts" name="switchDark">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'

const SettingStore = useSettingsStore()
// 设置信息
const themeConfig = computed(() => SettingStore.themeConfig)

// 切换暗黑模式
const switchDark = () => {
  const body = document.documentElement as HTMLElement
  if (themeConfig.value.isDark) {
    SettingStore.setThemeConfig({ key: 'isDark', val: true })
    body.setAttribute('class', 'dark')
  } else {
    body.setAttribute('class', '')
    SettingStore.setThemeConfig({ key: 'isDark', val: false })
  }
}
</script>
