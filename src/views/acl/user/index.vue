<template>
  <div>
    <ProTable
      ref="proTable"
      :columns="columns"
      :requestApi="getAclUserList"
      :initParam="initParam"
    >
      <!-- Expand -->
      <template #tableHeader="scope">
        <el-button type="primary" icon="Plus" @click="openDrawer('新增')">
          添加
        </el-button>
        <el-button
          type="danger"
          icon="Delete"
          plain
          @click="batchDelete(scope.selectedListIds)"
          :disabled="!scope.isSelected"
        >
          批量删除
        </el-button>
      </template>
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link icon="UserFilled">分配角色</el-button>
        <el-button
          type="primary"
          link
          icon="Edit"
          @click="openDrawer('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="primary"
          link
          icon="Delete"
          @click="deleteUser(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import UserDrawer from './components/UserDrawer.vue'
import type { AclUser } from '@/api/acl/types'
import { useHandleData } from '@/hooks/useHandleData'
import {
  getAclUserList,
  addAclUser,
  updateAclUser,
  deleteAclUserById,
  batchAclUser,
} from '@/api'

// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// *表格配置项
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
  { prop: 'gmtCreate', label: '创建时间', sortable: true },
  { prop: 'gmtModified', label: '更新时间' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

// *查询参数
const initParam = reactive({})

// *新增、编辑
const drawerRef = ref()
const openDrawer = (
  title: string,
  rowData: Partial<AclUser.ResAclUserList> = {},
) => {
  let params = {
    title,
    rowData: { ...rowData },
    api: title === '新增' ? addAclUser : updateAclUser,
    getTableList: proTable.value.getTableList,
  }
  drawerRef.value.acceptParams(params)
}

// *根据id删除用户
const deleteUser = async (row: AclUser.ResAclUserList) => {
  await useHandleData(deleteAclUserById, row.id, `删除${row.username}用户`)
  proTable.value.getTableList()
}
// *批量删除用户
const batchDelete = async (ids: string[]) => {
  await useHandleData(batchAclUser, ids, '删除所选用户信息')
  proTable.value.clearSelection()
  proTable.value.getTableList()
}
</script>
