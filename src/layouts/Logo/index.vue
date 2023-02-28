<template>
  <div class="logo-container flex-center">
    <a href="/">
      <img class="logo" alt="logo" src="/logo.png" />
      <h1 class="title">尚品汇后台管理</h1>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
.logo-container {
  position: relative;
  overflow: hidden;
  padding-left: 24px;
  height: 60px;
  background: transparent;
  line-height: 60px;

  .title {
    display: inline-block;
    margin-left: 12px;
    font-size: 20px;
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    color: #fff;
    font-weight: 600;
    vertical-align: middle;
  }

  .logo {
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
}
</style>
