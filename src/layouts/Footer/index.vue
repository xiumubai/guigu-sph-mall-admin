<template>
  <div class="layout-footer-container">
    Copyright
    <svg-icon name="copyright" size="16px" color="rgba(0, 0, 0, 0.45)" />
    尚品汇开源版本{{ fullYear }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const fullYear = ref(new Date().getFullYear())
    return {
      fullYear,
    }
  },
})
</script>

<style lang="scss" scoped>
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
</style>
