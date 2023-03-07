<template>
  <div>
    <!-- <SearchForm /> -->
    <ProTable :columns="columns" :requestApi="getAclUserList">
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- 表格操作 -->
      <!-- <template #operation="scope">
        <el-button>擦欧总</el-button>
      </template> -->
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { getAclUserList } from '@/api'
import { ColumnProps } from '@/components/ProTable/src/types'

// 表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 80 },
  { type: 'index', label: '#', width: 80 },
  { type: 'expand', label: 'Expand', width: 100 },
  { prop: 'username', label: '用户名' },
  { prop: 'nickName', label: '用户昵称' },
  { prop: 'roleName', label: '角色列表' },
  { prop: 'gmtCreate', label: '创建时间' },
  { prop: 'gmtModified', label: '更新时间' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 330 },
]
onMounted(async () => {
  // const pageparams = {
  //   page: 1,
  //   limit: 10,
  // }
  // const res = await getAclUserList(pageparams)
  // console.log(res)
})
</script>
