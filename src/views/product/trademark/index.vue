<template>
  <div>
    <ProTable
      ref="proTable"
      :columns="columns"
      :requestApi="getTrademarkList"
      :dataCallback="dataCallback"
    >
      <!-- Expand -->
      <template #tableHeader>
        <Auth :value="['btn.Role.add']">
          <el-button type="primary" icon="Plus" @click="openDrawer('新增')">
            添加
          </el-button>
        </Auth>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <Auth :value="['btn.Role.update']">
          <el-button
            type="primary"
            link
            icon="Edit"
            @click="openDrawer('修改', scope.row)"
          >
            编辑
          </el-button>
        </Auth>
        <Auth :value="['btn.Role.remove']">
          <el-button
            type="primary"
            link
            icon="Delete"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </Auth>
      </template>
    </ProTable>
    <MarkDrawer ref="DrawerRef" />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'

import { useHandleData } from '@/hooks/useHandleData'
import type { Trademark } from '@/api/product/types'
import MarkDrawer from './components/MarkDrawer.vue'

import {
  getTrademarkList,
  removeTrademark,
  addTrademark,
  updateTrademark,
} from '@/api'

const columns: ColumnProps[] = [
  { prop: 'id', label: 'id' },
  {
    prop: 'tmName',
    label: '品牌名称',
  },
  {
    prop: 'logoUrl',
    label: 'Logo',
    render: ({ row }) => {
      return (
        <>
          <el-image
            src={row.logoUrl}
            style="height: 100px; width: 100px;"
            fit="cover"
          />
        </>
      )
    },
  },
  { prop: 'updateTime', label: '更新时间', sortable: true },
  { prop: 'operation', label: '操作', fixed: 'right', width: 280 },
]

const proTable = ref()

// 处理返回的数据格式
const dataCallback = (data: any) => {
  return {
    list: data?.records,
    total: data?.total,
  }
}

// *根据id删除品牌
const handleDelete = async (row: Trademark.ResTradeMarkList) => {
  await useHandleData(removeTrademark, row.id, `删除${row.tmName}角色`)
  proTable.value.getTableList()
}

// 打开Drawer
const DrawerRef = ref()
const openDrawer = async (
  title: string,
  rowData: Partial<Trademark.ResTradeMarkList> = {},
) => {
  const params = {
    title,
    rowData: { ...rowData },
    api: title === '新增' ? addTrademark : updateTrademark,
    getTableList: proTable.value.getTableList,
  }
  DrawerRef.value.acceptParams(params)
}
</script>

<style scoped></style>
