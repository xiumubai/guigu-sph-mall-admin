<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getBannerList"
    >
      <template #tableHeader>
        <el-button type="primary" icon="Plus" @click="openDrawer('新增')">
          添加
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="Edit"
          @click="openDrawer('编辑', scope.row)"
        >
          修改
        </el-button>
        <el-button
          type="danger"
          link
          icon="Delete"
          @click="openDrawer('编辑', scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <!-- <CouponDrawer ref="drawerRef" /> -->
  </div>
</template>

<script setup lang="tsx">
import { getBannerList } from '@/api'
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
// import CouponDrawer from './components/CouponDrawer.vue'
import { Order } from '@/api/order/types'
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'imageUrl',
    label: '图片链接',
    render: ({ row }) => {
      return (
        <>
          <el-image src={row.imageUrl} />
        </>
      )
    },
  },
  { prop: 'linkUrl', label: '跳转链接' },
  { prop: 'sort', label: '排序' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 150 },
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
