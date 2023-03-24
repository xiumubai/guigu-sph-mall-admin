<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getCouponList"
    >
      <template #tableHeader>
        <el-button
          type="primary"
          icon="Plus"
          v-auth="['btn.User.add']"
          @click="openDrawer('新增')"
        >
          添加
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="UserFilled"
          v-auth="['btn.User.assgin']"
          @click="openDrawer('分配角色', scope.row)"
        >
          规则
        </el-button>
        <el-button
          type="primary"
          link
          icon="Edit"
          v-auth="['btn.User.update']"
          @click="openDrawer('编辑', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          type="danger"
          link
          icon="Delete"
          v-auth="'btn.User.remove'"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <CouponDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx">
import { getCouponList, removeCoupon } from '@/api'
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import CouponDrawer from './components/CouponDrawer.vue'
import { Coupon } from '@/api/marketing/types'
import { useHandleData } from '@/hooks/useHandleData'

// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'id', label: 'id' },
  {
    prop: 'couponName',
    label: '优惠券名称',
    width: 100,
  },
  { prop: 'couponTypeString', label: '优惠券类型', width: 100 },
  { prop: 'rangeTypeString', label: '范围类型', width: 100 },
  {
    prop: 'activityTypeString',
    label: '规则',
    render: ({ row }) => {
      return <div>减金额{row.benefitAmount}</div>
    },
  },
  { prop: 'limitNum', label: '用户领取数量', width: 110 },
  { prop: 'startTime', label: '开始时间', sortable: true, width: 110 },
  { prop: 'endTime', label: '结束时间', sortable: true, width: 110 },
  { prop: 'expireTime', label: '过期时间', sortable: true, width: 110 },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
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
  rowData: Partial<Coupon.ResCouponlist> = {},
) => {
  let params = {
    title,
    rowData: { ...rowData },
    api: '',
    getTableList: proTable.value.getTableList,
  }
  drawerRef.value.acceptParams(params)
}

const handleDelete = async (row: Coupon.ResCouponlist) => {
  await useHandleData(removeCoupon, row.id, `删除${row.couponName}用户`)
  proTable.value.getTableList()
}
</script>

<style scoped></style>
