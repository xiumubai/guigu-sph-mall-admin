<template>
  <div>
    <div>user</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { getAclUserList } from '@/api'

onMounted(async () => {
  const pageparams = {
    page: 1,
    limit: 10,
  }
  const res = await getAclUserList(pageparams)
  console.log(res)
})
</script>
