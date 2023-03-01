<template>
  <section class="app-mian-height">
    <div class="index">main</div>
  </section>
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
.app-mian-height {
  min-height: $base-app-main-height;
}
</style>
