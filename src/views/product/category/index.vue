<template>
  <el-card>
    <el-table
      class="category-list"
      border
      lazy
      :data="categorys"
      :load="load"
      style="width: 100%"
      :row-key="getRowKey"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="分类ID" align="center" width="150" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="createTime" label="创建时间" sortable />
      <el-table-column prop="updateTime" label="更新时间" sortable />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getCategorys1, getCategorys2, getCategorys3 } from '@/api'

import type { Category } from '@/api/product/types'
import type { TreeNode } from 'element-plus'

onMounted(() => {
  getCategoryList()
})

const categorys = ref([])
async function getCategoryList() {
  const res = await getCategorys1()

  const list: any = res.data
  list.forEach((c: { hasChildren: boolean; level: number }) => {
    c.hasChildren = true
    c.level = 1
  })
  categorys.value = list
}

async function load(
  row: Category.ResCategoryList,
  treeNode: TreeNode,
  resolve: (data: any[]) => void,
) {
  console.log(treeNode)
  if (row.level === 1) {
    const res: any = await getCategorys2(row?.id)
    res.data.forEach((c: { hasChildren: boolean; level: number }) => {
      c.hasChildren = true
      c.level = 2
    })
    resolve(res.data)
  } else if (row.level === 2) {
    const res: any = await getCategorys3(row?.id)
    resolve(res.data)
  }
}

function getRowKey(row: { level: string; id: string }) {
  return row.level + '-' + row.id
}
</script>

<style scoped lang="scss">
.category-list {
  .level2-row {
    background: #f0f9eb;
  }
}
</style>
