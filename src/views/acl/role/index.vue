<template>
  <div>
    <ProTable ref="proTable" :columns="columns" :requestApi="getRoleList">
      <!-- Expand -->
      <template #tableHeader>
        <el-button type="primary" icon="Plus" @click="openDialog('新增')">
          添加
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="UserFilled"
          @click="openDrawer('分配角色', scope.row)"
        >
          分配权限
        </el-button>
        <el-button
          type="primary"
          link
          icon="Edit"
          @click="openDialog('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          icon="Delete"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <RoleDialog ref="DialogRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import RoleDialog from './components/RoleDialog.vue'
import type { Role } from '@/api/acl/types'
import { useHandleData } from '@/hooks/useHandleData'
import { getRoleList, deleteRole, addRole, updateRole } from '@/api'

const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'id', label: 'id' },
  {
    prop: 'roleName',
    label: '角色名称',
    search: { el: 'input', props: { placeholder: '输入角色名称' } },
  },
  { prop: 'createTime', label: '创建时间', sortable: true },
  { prop: 'updateTime', label: '更新时间', sortable: true },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

const proTable = ref()

const DialogRef = ref()
// 打开Dialog
const openDialog = (title: string, rowData: Partial<Role.ResRoleList> = {}) => {
  const params = {
    title: title,
    rowData,
    api: title === '新增' ? addRole : updateRole,
    getTableList: proTable.value.getTableList,
  }
  DialogRef.value.acceptParams(params)
}

// 打开Drawer
const openDrawer = (title: string, rowData: Partial<Role.ResRoleList> = {}) => {
  console.log(title, rowData)
}

// *根据id删除角色
const handleDelete = async (row: Role.ResRoleList) => {
  await useHandleData(deleteRole, row.id, `删除${row.roleName}角色`)
  proTable.value.getTableList()
}
</script>
