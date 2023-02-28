<template>
  <div class="tabs-bar-container">tabsbar</div>
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
</style>
