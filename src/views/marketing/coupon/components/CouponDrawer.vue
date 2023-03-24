<template>
  <el-drawer
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="450px"
    :title="`${drawerProps.title}优惠券`"
  >
    <el-form
      ref="ruleFormRef"
      label-width="110px"
      label-suffix=" :"
      :rules="rules"
      :model="drawerProps.rowData"
    >
      <el-form-item label="优惠券名称" prop="couponName">
        <el-input
          v-model="drawerProps.rowData!.couponName"
          placeholder="请填写优惠券名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="优惠券类型" prop="couponType">
        <el-radio-group v-model="drawerProps.rowData!.couponType">
          <el-radio :label="3">现金券</el-radio>
          <el-radio :label="6">折扣券</el-radio>
          <el-radio :label="9">满减券</el-radio>
          <el-radio :label="9">满量打折券</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户领取数量" prop="limitNum">
        <el-input-number
          v-model="drawerProps.rowData!.limitNum"
          :min="1"
          :max="100"
        />
        <div class="info">填写每个用户可以领取多少张</div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
// import type { Roles } from '@/api/acl/types'
interface DrawerProps {
  title: string
  rowData?: any
  list?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}
const rules = reactive({
  couponName: [
    { required: true, message: '请填写优惠券名称' },
    { min: 2, message: '用户名不能小于2位' },
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

const loading = ref<boolean>(false)

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
      loading.value = true
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` })
      drawerProps.value.getTableList!()
      drawerVisible.value = false
      loading.value = false
    } catch (error) {
      loading.value = false
      console.log(error)
    }
  })
}

defineExpose({
  acceptParams,
})
</script>
<style lang="scss" scoped>
.info {
  font-size: 12px;
  color: #888;
}
</style>
