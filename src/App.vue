<template>
  <div>
    <div>
      <svg-icon name="refresh" spin></svg-icon>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
// import SvgIcon from '@/components/SvgIcon/src/SvgIcon.vue'
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
