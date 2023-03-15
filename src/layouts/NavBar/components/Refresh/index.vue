<!--
 * @Description: 
 * @Autor: 李海波
 * @Date: 2023-03-03 13:41:05
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-14 16:27:53
-->
<template>
  <div class="btn">
    <el-tooltip effect="dark" content="刷新">
      <el-icon :size="18" @click="onRefresh">
        <Refresh />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'

export default defineComponent({
  setup() {
    const settingsStore = useSettingsStore()
    const onRefresh = () => {
      settingsStore.setRefresh()
    }
    return { onRefresh }
  },
})
</script>

<style scoped lang="scss">
.btn {
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
