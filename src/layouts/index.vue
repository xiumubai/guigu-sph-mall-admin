<template>
  <div class="layout-admin-wrapper">
    <div class="layout-container-vertical fixed">
      <LayoutSideBar />
      <div class="layout-main" :class="{ 'is-collapse': collapse }">
        <div
          class="layout-header fixed-header"
          :class="{ 'is-collapse': collapse }"
        >
          <LayoutNavBar />
          <LayoutTabsBar />
        </div>
        <div class="app-main-container">
          <LayoutMain />
          <LayoutFooter />
        </div>
      </div>
    </div>
    <el-backtop />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'

import LayoutFooter from './Footer/index.vue'
import LayoutMain from './Main/index.vue'
import LayoutSideBar from './SideBar/index.vue'
import LayoutNavBar from './NavBar/index.vue'
import LayoutTabsBar from './TabsBar/index.vue'

const settingsStore = useSettingsStore()
const collapse = computed(() => settingsStore.collapse)
</script>

<style scoped lang="scss">
@mixin fix-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: $base-z-index - 2;
  width: calc(100% - $base-left-menu-width);
}

.layout-admin-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .layout-container-vertical {
    position: relative;
    width: 100%;
    height: 100%;

    &.fixed {
      padding-top: calc(#{$base-top-bar-height} + #{$base-tabs-bar-height});
    }

    .layout-main {
      margin-left: $base-left-menu-width;
      min-height: 100%;

      &.is-collapse {
        margin-left: $base-left-menu-width-min;
        border-right: 0;
      }

      .layout-header {
        &.fixed-header {
          @include fix-header;
        }

        &.is-collapse {
          width: calc(100% - $base-left-menu-width-min);
        }
      }

      .app-main-container {
        padding: 20px;
      }
    }
  }
}
</style>
