<!--
 * @Description: 
 * @Autor: 李海波
 * @Date: 2023-03-03 13:39:38
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-17 11:05:27
-->
<template>
  <div class="m-screenful">
    <el-tooltip
      effect="dark"
      :content="!isFullscreen ? '全屏' : '收起'"
      placement="bottom"
    >
      <IconifyIcon
        v-if="!isFullscreen"
        @click="toggle"
        icon="fluent:full-screen-maximize-24-filled"
        height="16"
      />
      <IconifyIcon
        v-else
        @click="toggle"
        icon="fluent:full-screen-minimize-24-filled"
        height="18"
      />
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { useFullscreen } from '@vueuse/core'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { toggle, isFullscreen } = useFullscreen()
    return {
      toggle,
      isFullscreen,
    }
  },
})
</script>

<style lang="scss" scoped>
.m-screenful {
  padding-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
