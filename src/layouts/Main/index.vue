<template>
  <section class="app-mian-height">
    <div class="index">
      <router-view v-slot="{ Component, route }">
        <transition appear name="fade-transform" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
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
  padding: 20px;
  background-color: #fff;
}
</style>
