<template>
  <div class="layout-admin-wrapper">
    <div class="layout-container-vertical fixed">
      <div class="layout-sidebar-container">sidebar</div>
      <div class="layout-main">
        <div class="layout-header fixed-header">
          <div class="nav-bar-container">nav</div>
          <div class="tabs-bar-container">tabs</div>
        </div>
        <div class="app-main-container">
          <section class="app-mian-height">
            <div class="index">main</div>
          </section>
          <div class="layout-footer-container">
            Copyright
            <svg-icon
              name="copyright"
              size="16px"
              color="rgba(0, 0, 0, 0.45)"
            />
            尚品汇开源版本2023
          </div>
        </div>
      </div>
    </div>
    <el-backtop />
  </div>
</template>

<script setup lang="ts"></script>

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

        .nav-bar-container {
          position: relative;
          overflow: hidden;
          padding-right: $base-padding;
          padding-left: $base-padding;
          height: $base-nav-bar-height;
          background: $base-color-white;
          box-shadow: $base-box-shadow;
          user-select: none;
        }

        .tabs-bar-container {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: $base-padding;
          padding-left: $base-padding;
          height: $base-tabs-bar-height;
          background: $base-color-white;
          box-sizing: border-box;
          align-content: center;
          user-select: none;
          border-top: 1px solid #f6f6f6;
        }
      }

      .app-main-container {
        padding: 20px;

        .app-mian-height {
          min-height: $base-app-main-height;

          .index {
            height: 1500px;
          }
        }

        .layout-footer-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
          min-height: 55px;
          color: rgb(0 0 0 / 45%);
          background: var(--el-color-white);
          border-top: 1px dashed #dcdfe6;
        }
      }
    }
  }
}
</style>
