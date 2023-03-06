<template>
  <div class="m-setting-fix">
    <div class="item">
      <div class="item-child" @click="operator()">
        <el-icon size="30" color="#3698fd" style="margin-bottom: 8px">
          <Tools />
        </el-icon>
        主题配置
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer" title="主题配置" size="300px">
    <div class="theme-item">
      <label>主题颜色</label>
      <el-color-picker
        v-model="primary"
        :predefine="predefineColor"
        @change="changePrimary"
      />
    </div>
    <div class="theme-item">
      <label>暗黑模式</label>
      <switch-dark></switch-dark>
    </div>
    <div class="theme-item">
      <label>标签栏</label>
      <el-switch
        v-model="showTag"
        @change="(val) => changeSwitch('showTag', val as boolean)"
      />
    </div>
  </el-drawer>
</template>
<script setup lang="ts" name="Theme">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useSettingsStore } from '@/store/modules/settings'
import { DEFAULT_PRIMARY } from '@/config/config'
import SwitchDark from '@/components/SwitchDark/index.vue'

const SettingStore = useSettingsStore()
const primary = ref(SettingStore.themeConfig.primary as string)
const showTag = ref(SettingStore.themeConfig.showTag)
// 预定义主题颜色
const predefineColor = [
  '#1890ff',
  '#409EFF',
  '#304156',
  '#212121',
  '#11a983',
  '#13c2c2',
  '#6959CD',
  '#f5222d',
]
const drawer = ref(false)
const operator = () => {
  drawer.value = true
}
const changePrimary = (val: string | null) => {
  console.log('val', val)
  if (!val) {
    primary.value = val = DEFAULT_PRIMARY
    ElMessage({
      type: 'success',
      message: `主题颜色已重置为 ${DEFAULT_PRIMARY}`,
    })
  } else {
    document.documentElement.style.setProperty('--el-color-primary', val)
    document.documentElement.style.setProperty('--main-text-color', val)
    changeSwitch('primary', val)
  }
}
// 存储配置
const changeSwitch = (key: string, val: string | boolean) => {
  SettingStore.setThemeConfig({ key, val })
}
</script>
<style scoped lang="scss">
.m-setting-fix {
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 999;
  padding: 10px 0 0;
  margin: 0;
  text-align: center;
  cursor: pointer;
  background: rgb(255 255 255 / 20%);
  border: 1px solid #dcdfe6;
  border-top-left-radius: 5.5px;
  border-bottom-left-radius: 5.5px;
  box-shadow: 0 0 50px 0 rgb(82 63 105 / 15%);
  transform: translateY(-50%);

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 8px 10px 10px;
    margin: 0;
    list-style: none;
  }

  .item-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    font-size: 12px;
    color: #3698fd;

    /* padding-top: 10px; */
    text-align: center;
    background: #f6f8f9;
    background: #ebf5ff;
    border-radius: 5.5px;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .item-child2 {
    margin-top: 10px;
    color: #b37feb;
    background: #f7f2fd;
    transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease;
  }
}

.theme-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  font-size: 14px;
  color: black;
}
</style>
