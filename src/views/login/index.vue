<template>
  <div class="login-container">
    <el-alert
      v-show="false"
      title="尚品汇商城管理平台"
      type="success"
      :closable="false"
      style="position: fixed"
    ></el-alert>
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="14">
        <div style="color: transparent">左侧区域占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          class="login-form"
        >
          <div class="form-header">
            <div class="title">hello !</div>
            <div class="title-tips">欢迎来到尚品汇！</div>
          </div>
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              :prefix-icon="User"
              autocomplete="off"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              :prefix-icon="Lock"
              autocomplete="off"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              size="large"
              @click="submitForm(ruleFormRef)"
            >
              登陆
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import type { FormInstance } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const ruleFormRef = ref<FormInstance>()
const userStore = useUserStore()
const ruleForm = reactive({
  username: '',
  password: '',
})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (!ruleFormRef.value) return
    ruleFormRef.value.validateField('checkPass', () => null)
    callback()
  }
}

const rules = reactive({
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, validator: validatePass }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      userStore.login({
        ...ruleForm,
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style scoped lang="less">
@import url('./index.less');
</style>
