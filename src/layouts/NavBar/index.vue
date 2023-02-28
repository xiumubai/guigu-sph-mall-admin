<template>
  <div class="nav-bar-container">nav</div>
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
</style>
