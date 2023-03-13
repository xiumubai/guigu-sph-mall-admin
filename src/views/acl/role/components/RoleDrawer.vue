<template>
  <el-drawer
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="450px"
    :title="`${drawerProps.title}`"
  >
    <el-form label-width="100px" label-suffix=" :">
      <el-form-item label="角色名称">
        <el-input
          disabled
          v-model="drawerProps.rowData!.roleName"
          placeholder="请填写角色名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="权限列表" prop="permissionId">
        <div class="tree-border">
          <el-tree
            ref="treeRef"
            node-key="id"
            show-checkbox
            default-expand-all
            :default-checked-keys="checkedKeys"
            :data="allPermission"
            :props="defaultProps"
          />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref } from 'vue'
import { ElMessage, ElTree } from 'element-plus'
import type { Permission } from '@/api/acl/types'
interface DrawerProps {
  title: string
  rowData?: any
  list?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

// drawer框状态
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  title: '',
})

const defaultProps = {
  children: 'children',
  label: 'name',
}
const allPermission = ref<Permission.ResPermisionList[]>([])
const checkedKeys = ref<string[]>([])

const treeRef = ref<InstanceType<typeof ElTree>>()

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  const { list } = params
  drawerProps.value = params
  drawerVisible.value = true
  allPermission.value = list.data
  checkedKeys.value = getCheckedIds(list.data)
}

// 获取选中的id
const getCheckedIds = (
  auths: Permission.ResPermisionList[],
  initArr: string[] = [],
): string[] => {
  auths.forEach((item: Permission.ResPermisionList) => {
    if (item.select && item.level === 4) {
      initArr.push(item.id as string)
    } else if (item.children) {
      getCheckedIds(item.children, initArr)
    }
  })
  return initArr
}

const handleSubmit = async () => {
  try {
    // 获取selectdKeys
    const checkedKeys = treeRef.value?.getCheckedKeys() || []
    console.log(checkedKeys)
    const params = {
      roleId: drawerProps.value.rowData.id,
      permissionId: checkedKeys?.join(','),
    }
    await drawerProps.value.api!(params)
    ElMessage.success({ message: `${drawerProps.value.title}成功！` })
    drawerProps.value.getTableList!()
    drawerVisible.value = false
  } catch (error) {
    console.log(error)
  }
}

defineExpose({
  acceptParams,
})
</script>
<style lang="scss" scoped>
.tree-border {
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  border: 1px solid #dcdfe6;
  border-radius: 2.5px;
}
</style>
