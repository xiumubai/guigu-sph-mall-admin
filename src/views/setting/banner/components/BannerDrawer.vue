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
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="drawerProps.rowData!.title"
          placeholder="请填写品牌名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Banner" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          :action="`dev-api/admin/product/fileUpload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="drawerProps.rowData!.imageUrl"
            :src="drawerProps.rowData!.imageUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          <template #tip>
            <div class="el-upload__tip">只能上传jpg/png文件，且不超过50kb</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="链接" prop="linkUrl">
        <el-input
          v-model="drawerProps.rowData!.linkUrl"
          placeholder="请填写跳转链接"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="drawerProps.rowData!.sort" :min="1" />
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
import { ElMessage, FormInstance, UploadProps } from 'element-plus'
interface DrawerProps {
  title: string
  rowData?: any
  list?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}

const rules = reactive({
  title: [{ required: true, message: '请填写banner名称' }],
  imageUrl: [{ required: true, message: '请上传Banner图片' }],
  linkUrl: [{ required: true, message: '请填写跳转地址' }],
  sort: [{ required: true, message: '请填写排序' }],
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

const handleAvatarSuccess: UploadProps['onSuccess'] = (res, file) => {
  // 保存请求返回的图片url数据
  console.log(res, file)
  drawerProps.value.rowData.imageUrl = res.data
}

const beforeAvatarUpload = (file: any) => {
  const isJPGOrPNG = ['image/jpeg', 'image/png'].indexOf(file.type) >= 0
  const isLt50K = file.size / 1024 > 50

  if (!isJPGOrPNG) {
    ElMessage.error('上传头像图片只能是 JPG/PNG 格式!')
  }
  if (!isLt50K) {
    ElMessage.error('上传头像图片大小不能超过 50K!')
  }
  return isJPGOrPNG && isLt50K
}

const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      await drawerProps.value.api!(drawerProps.value.rowData)
      ElMessage.success({ message: `${drawerProps.value.title}品牌成功！` })
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
.avatar-uploader {
  width: 100%;

  :deep(.el-upload) {
    position: relative;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    transition: var(--el-transition-duration-fast);
  }
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 100%;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

.avatar {
  display: block;
  width: 100%;
  height: 178px;
}
</style>
