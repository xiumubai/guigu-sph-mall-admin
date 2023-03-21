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
          type="primary"
          link
          icon="View"
          v-auth="['btn.User.update']"
          @click="openDrawer('编辑', scope.row)"
        >
          查看
        </el-button>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx">
import { getClientUserList } from '@/api'
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { Order } from '@/api/order/types'

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

// *新增、编辑
const drawerRef = ref()
const openDrawer = async (
  title: string,
  rowData: Partial<Order.ResOrderList> = {},
) => {
  let params = {
    title,
    rowData: { ...rowData },
    api: '',
    getTableList: proTable.value.getTableList,
  }
  drawerRef.value.acceptParams(params)
}
</script>

<style scoped></style>
