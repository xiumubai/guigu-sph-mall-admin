<template>
  <div>
    <ProTable
      ref="proTable"
      :columns="columns"
      :requestApi="getAclUserList"
      :initParam="initParam"
    >
      <!-- Expand -->
      <template #tableHeader>
        <el-button type="primary" icon="Plus">添加</el-button>
        <el-button type="danger" icon="Delete">批量删除</el-button>
      </template>
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- 表格操作 -->
      <template #operation>
        <el-button type="primary" link icon="UserFilled">分配角色</el-button>
        <el-button type="primary" link icon="Edit">编辑</el-button>
        <el-button type="primary" link icon="Delete">删除</el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { getAclUserList } from '@/api'
import { ColumnProps } from '@/components/ProTable/src/types'
// 表格配置项
const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 80 },
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'username',
    label: '用户名',
    search: { el: 'input', props: { placeholder: '输入用户名' } },
  },
  { prop: 'nickName', label: '用户昵称' },
  { prop: 'roleName', label: '角色列表' },
  { prop: 'gmtCreate', label: '创建时间' },
  { prop: 'gmtModified', label: '更新时间' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

/** 查询参数 */
const initParam = reactive({})
</script>
