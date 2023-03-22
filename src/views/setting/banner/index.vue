<template>
  <div>
    <ProTable
      ref="proTable"
      :dataCallback="dataCallback"
      :columns="columns"
      :requestApi="getBannerList"
    >
      <template #tableHeader>
        <el-button
          type="primary"
          icon="Plus"
          @click="openDrawer('新增')"
          v-auth="['Banner.Btn.Add']"
        >
          添加
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button
          type="primary"
          link
          icon="Edit"
          v-auth="['Banner.Btn.Edit']"
          @click="openDrawer('编辑', scope.row)"
        >
          修改
        </el-button>
        <el-button
          type="danger"
          link
          icon="Delete"
          v-auth="['Banner.Btn.Delete']"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </ProTable>
    <BannerDrawer ref="drawerRef" />
  </div>
</template>

<script setup lang="tsx">
import { getBannerList, saveBanner, updateBanner, removeBanner } from '@/api'
import { ref } from 'vue'
import { ColumnProps } from '@/components/ProTable/src/types'
import BannerDrawer from './components/BannerDrawer.vue'
import { useHandleData } from '@/hooks/useHandleData'
import { Banner } from '@/api/setting/types'
// *表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 80 },
  {
    prop: 'imageUrl',
    label: '图片链接',
    render: ({ row }) => {
      return (
        <>
          <el-image src={row.imageUrl} lazy />
        </>
      )
    },
  },
  {
    prop: 'linkUrl',
    label: '跳转链接',
    render: ({ row }) => {
      return (
        <>
          <el-link href={row.linkUrl} target="_blank" type="primary">
            {row.linkUrl}
          </el-link>
        </>
      )
    },
  },
  { prop: 'title', label: '标题' },
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
  rowData: Partial<Banner.ResBannerList> = {},
) => {
  let params = {
    title,
    rowData: { ...rowData },
    api: title === '编辑' ? updateBanner : saveBanner,
    getTableList: proTable.value.getTableList,
  }
  drawerRef.value.acceptParams(params)
}

// *根据id删除品牌
const handleDelete = async (row: Banner.ResBannerList) => {
  await useHandleData(removeBanner, row.id, `删除${row.title}`)
  proTable.value.getTableList()
}
</script>

<style scoped></style>
