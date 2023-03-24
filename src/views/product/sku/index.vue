<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getSkuList"
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
import { getSkuList } from '@/api'
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import { Order } from '@/api/order/types'
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 50 },
  { prop: 'id', label: 'id', width: 50 },
  { prop: 'skuName', label: '商品名称' },
  { prop: 'skuDesc', label: '商品描述' },
  {
    prop: 'skuDefaultImg',
    label: '商品图片',
    render: ({ row }) => {
      return (
        <>
          <el-image
            src={row.skuDefaultImg}
            style="height: 100px; width: 100px;"
            fit="cover"
          />
        </>
      )
    },
  },
  { prop: 'price', label: '商品价格（¥）', width: 120 },
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
