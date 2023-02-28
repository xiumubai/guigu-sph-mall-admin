<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <el-col :sm="12" :md="12" :lg="12" :xl="12">
        <div class="left-panel">
          <el-icon class="fold-unfold" @click="handleCollapse">
            <component :is="collapse ? 'Expand' : 'Fold'"></component>
          </el-icon>
        </div>
      </el-col>
      <el-col :sm="12" :md="12" :lg="12" :xl="12">
        <div class="right-panel">
          <User />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'
import { Expand, Fold } from '@element-plus/icons-vue'
import User from './components/User/index.vue'
export default defineComponent({
  components: {
    Expand,
    Fold,
    User,
  },
  setup() {
    const settingsStore = useSettingsStore()

    const collapse = computed(() => settingsStore.collapse)

    function handleCollapse() {
      settingsStore.changeCollapse()
    }
    return {
      collapse,
      handleCollapse,
    }
  },
})
</script>

<style scoped lang="scss">
.nav-bar-container {
  position: relative;
  overflow: hidden;
  padding-right: $base-padding;
  padding-left: $base-padding;
  height: $base-nav-bar-height;
  background: $base-color-white;
  box-shadow: $base-box-shadow;
  user-select: none;

  .left-panel {
    display: flex;
    align-items: center;
    justify-items: center;
    height: 60px;

    .fold-unfold {
      font-size: 18px;
      color: $base-color-gray;
      cursor: pointer;
    }
  }

  .right-panel {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: $base-nav-bar-height;
    align-content: center;
  }
}
</style>
