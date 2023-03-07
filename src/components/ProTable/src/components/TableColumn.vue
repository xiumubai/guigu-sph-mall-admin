<template>
  <el-table-column v-bind="column"></el-table-column>
</template>

<script setup lang="tsx" name="TableColumn">
import { ColumnProps } from '../types'
defineProps<{ column: ColumnProps }>()
</script>

<style scoped></style>
