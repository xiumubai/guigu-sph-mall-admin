<!--
 * @Description: 
 * @Autor: 李海波
 * @Date: 2023-03-03 13:39:38
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-09 16:16:38
-->
<template>
  <div class="m-screenful">
    <el-tooltip
      effect="dark"
      :content="!isFullscreen ? '全屏' : '收起'"
      placement="bottom"
    >
      <SvgIcon
        size="16"
        name="full-screen"
        v-if="!isFullscreen"
        @click="toggle"
      />
      <SvgIcon size="16" name="exit-full" v-else @click="toggle" />
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
