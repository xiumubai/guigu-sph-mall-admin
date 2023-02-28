<template>
  <div class="layout-admin-wrapper">
    <div class="layout-container-vertical fixed">
      <div class="layout-sidebar-container">
        <LayoutSideBar />
      </div>
      <div class="layout-main">
        <div class="layout-header fixed-header">
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
import LayoutFooter from './Footer/index.vue'
import LayoutMain from './Main/index.vue'
import LayoutSideBar from './SideBar/index.vue'
import LayoutNavBar from './NavBar/index.vue'
import LayoutTabsBar from './TabsBar/index.vue'
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

    .layout-sidebar-container {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: $base-z-index;
      width: $base-left-menu-width;
      height: 100vh;
      background: $base-menu-background;
      box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
      transition: width $base-transition-time;
    }

    .layout-main {
      margin-left: $base-left-menu-width;
      min-height: 100%;

      .layout-header {
        &.fixed-header {
          @include fix-header;
        }
      }

      .app-main-container {
        padding: 20px;
      }
    }
  }
}
</style>
