<template>
  <div class="layout-sidebar-container" :class="{ 'is-collapse': collapse }">
    <Logo />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'
import Logo from '../Logo/index.vue'
export default defineComponent({
  components: {
    Logo,
  },
  setup() {
    const settingsStore = useSettingsStore()
    const collapse = computed(() => settingsStore.collapse)
    return {
      collapse,
    }
  },
})
</script>

<style scoped lang="scss">
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

  &.is-collapse {
    width: $base-left-menu-width-min;
    border-right: 0;
  }
}
</style>
