<template>
  <div class="btn">
    <el-tooltip effect="dark" content="刷新">
      <el-icon :size="16" @click="onRefresh" color="rgba(0, 0, 0, 0.65)">
        <Refresh />
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
  margin-right: 20px;
  cursor: pointer;
}
</style>
