<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getClientUserList"
    >
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="danger"
          link
          icon="Lock"
          v-auth="['btn.User.update']"
          v-if="scope.row.status"
          @click="handleLock(scope.row)"
        >
          封禁
        </el-button>
        <el-button
          type="primary"
          link
          icon="Unlock"
          v-else
          v-auth="['btn.User.update']"
          @click="handleLock(scope.row)"
        >
          启用
        </el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx">
import { getClientUserList, lockClientUser } from '@/api'
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { ClientUser } from '@/api/client-user/types'
import { useHandleData } from '@/hooks/useHandleData'
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'id', label: 'id' },
  {
    prop: 'nickName',
    label: '昵称',
    search: { el: 'input', key: 'keyword' },
  },
  { prop: 'name', label: '姓名' },
  { prop: 'phoneNum', label: '手机号' },
  {
    prop: 'status',
    label: '状态',
    render: ({ row }) => {
      return (
        <>
          <el-tag type={row.status ? 'success' : 'danger'}>
            {row.status ? '启用' : '禁用'}
          </el-tag>
        </>
      )
    },
  },
  { prop: 'status', label: '会员等级' },
  { prop: 'createTime', label: '创建时间', sortable: true, width: 110 },
  { prop: 'operation', label: '操作', fixed: 'right', width: 100 },
]
// *获取 ProTable 元素，调用其获取刷新数据方法
const proTable = ref()

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}

// 锁定用户
const handleLock = async (row: ClientUser.ResClientUserList) => {
  const status = row.status ? 0 : 1
  await useHandleData(
    lockClientUser,
    { id: row.id, status: status },
    `${status ? '启用' : '封禁'}`,
  )
  proTable.value.getTableList()
}
</script>

<style scoped></style>
