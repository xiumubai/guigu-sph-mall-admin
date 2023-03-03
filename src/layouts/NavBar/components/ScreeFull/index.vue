<!--
 * @Description: 
 * @Autor: 李海波
 * @Date: 2023-03-03 13:39:38
 * @LastEditors: 李海波
 * @LastEditTime: 2023-03-03 14:00:33
-->
<template>
  <div class="m-screenful">
    <el-tooltip
      effect="dark"
      :content="!isFullscreen ? '全屏' : '收起'"
      placement="bottom"
    >
      <el-icon :size="16" @click="toggle">
        <full-screen />
      </el-icon>
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
