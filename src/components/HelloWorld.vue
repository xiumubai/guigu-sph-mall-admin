<script setup lang="ts">
// import { login, loginRaw, getUserInfo } from '../api/user'
import { login, getUserInfo } from '@/api'

defineProps<{ msg: string }>()

const handleSubmit = async () => {
  const form = {
    username: 'xiumubai',
    password: '111111',
  }
  const res = await login(form)
  console.log(res.token)
  const userinfo = await getUserInfo()
  console.log(userinfo)
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <el-button type="primary" @click="handleSubmit" class="login-form-button">
    登 录
  </el-button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
