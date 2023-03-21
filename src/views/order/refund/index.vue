<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getRefundList"
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
    <!-- <CouponDrawer ref="drawerRef" /> -->
  </div>
</template>

<script setup lang="tsx">
import { getRefundList } from '@/api'
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
// import CouponDrawer from './components/CouponDrawer.vue'
import { Order } from '@/api/order/types'
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'id', label: 'id' },
  { prop: 'outTradeNo', label: '订单号' },
  {
    prop: 'imgUrl',
    label: '商品图片',
    render: ({ row }) => {
      return (
        <>
          <el-image src={row.imgUrl} style="width: 100px; height: 100px" />
        </>
      )
    },
  },

  {
    prop: 'detail',
    label: '商品详情',
    render: ({ row }) => {
      return (
        <>
          <div>{row.skuName}</div>
          <div>退款数量：{row.refundNum}</div>
          <div>退款金额：{row.refundAmount}</div>
        </>
      )
    },
  },
  { prop: 'refundReasonTypeString', label: '退款原因' },
  { prop: 'refundTypeString', label: '退款类型' },
  { prop: 'refundStatusString', label: '退款状态' },
  { prop: 'approveRemark', label: '退款备注' },
  { prop: 'approveTime', label: '申请时间', sortable: true, width: 110 },
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
