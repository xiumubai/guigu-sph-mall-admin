<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getActivityList"
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
          icon="UserFilled"
          v-auth="['btn.User.assgin']"
          @click="openDrawer('分配角色', scope.row)"
        >
          分配规则
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
    <ActivityDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="ts">
import { getActivityList } from '@/api'
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import ActivityDrawer from './components/ActivityDrawer.vue'
import { Activity } from '@/api/marketing/types'
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  { prop: 'id', label: 'id' },
  {
    prop: 'activityName',
    label: '活动名称',
  },
  {
    prop: 'activityDesc',
    label: '活动m描述',
  },
  { prop: 'activityTypeString', label: '活动类型' },
  { prop: 'startTime', label: '开始时间', sortable: true },
  { prop: 'endTime', label: '结束时间', sortable: true },
  { prop: 'createTime', label: '创建时间', sortable: true },
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
  rowData: Partial<Activity.ResActivityList> = {},
) => {
  let params = {
    title,
    rowData: { ...rowData },
    api: '',
    getTableList: proTable.value.getTableList,
  }
  drawerRef.value.acceptParams(params)
}

const handleDelete = (row: Activity.ResActivityList) => {
  console.log(row)
}
</script>

<style scoped></style>
