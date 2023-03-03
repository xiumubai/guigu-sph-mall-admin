<!--
 * @Description: 
 * @Autor: 李海波
 * @Date: 2023-03-03 13:41:05
 * @LastEditors: 李海波
 * @LastEditTime: 2023-03-03 13:53:54
-->
<template>
  <div class="btn">
    <el-tooltip effect="dark" content="刷新">
      <el-icon :size="22" @click="onRefresh">
        <refresh />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'

export default defineComponent({
  setup() {
    const settingsStore = useSettingsStore()
    const isShow = ref(true)
    const onRefresh = () => {
      settingsStore.setRefresh()
    }
    return { isShow, onRefresh }
  },
})
</script>

<style scoped lang="scss">
.btn {
  margin-right: 10px;
  cursor: pointer;
}
</style>
