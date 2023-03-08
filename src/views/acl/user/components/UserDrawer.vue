<template>
  <el-drawer
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="450px"
    :title="`${drawerProps.title}用户`"
  >
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :model="drawerProps.rowData"
    >
      <el-form-item label="用户姓名" prop="username">
        <el-input
          v-model="drawerProps.rowData!.username"
          placeholder="请填写用户姓名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickName">
        <el-input
          v-model="drawerProps.rowData!.nickName"
          placeholder="请填写用户昵称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="用户密码"
        prop="password"
        v-if="drawerProps.title === '新增'"
      >
        <el-input
          v-model="drawerProps.rowData!.password"
          placeholder="请填写用户密码"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
interface DrawerProps {
  title: string
  rowData?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

const rules = reactive({
  username: [
    { required: true, message: '请填写用户姓名' },
    { min: 4, message: '用户名不能小于4位' },
  ],
  password: [
    { required: true, message: '请填写用户密码' },
    { min: 6, message: '密码不能小于6位' },
  ],
})

// drawer框状态
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  title: '',
})

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  drawerProps.value = params
  drawerVisible.value = true
}

const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      await drawerProps.value.api!(drawerProps.value.rowData)
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` })
      drawerProps.value.getTableList!()
      drawerVisible.value = false
    } catch (error) {
      console.log(error)
    }
  })
}

defineExpose({
  acceptParams,
})
</script>
<style lang="scss" scoped></style>
