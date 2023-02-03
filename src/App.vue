<template>
  <div>
    <Login />
  </div>
</template>

<script setup lang="ts">
import Login from '@/views/login/index.vue'
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
