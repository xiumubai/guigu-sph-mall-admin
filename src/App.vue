<template>
  <div>
    <div>
      <!-- <svg-icon name="home" color="red"></svg-icon>
      <svg-icon name="loading" spin></svg-icon> -->
      <svg-icon name="refresh" spin></svg-icon>
    </div>
    <Login />
  </div>
</template>

<script setup lang="ts">
import Login from '@/views/login/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
</script>

<style scoped lang="less">
.logo {
  padding: 1.5em;
  height: 6em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
