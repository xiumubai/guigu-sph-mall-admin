<template>
  <el-form inline>
    <el-form-item label="一级分类">
      <el-select
        placeholder="请选择"
        v-model="state.category1Id"
        @change="handleCategory1Change"
        :disabled="state.disabled"
      >
        <el-option
          :label="c1.name"
          :value="c1.id + '__' + c1.name"
          v-for="c1 in state.category1List"
          :key="c1.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        placeholder="请选择"
        v-model="state.category2Id"
        @change="handleCategory2Change"
        :disabled="state.disabled"
      >
        <el-option
          :label="c2.name"
          :value="c2.id + '__' + c2.name"
          v-for="c2 in state.category2List"
          :key="c2.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        placeholder="请选择"
        v-model="state.category3Id"
        @change="handleCategory3Change"
        :disabled="state.disabled"
      >
        <el-option
          :label="c3.name"
          :value="c3.id + '__' + c3.name"
          v-for="c3 in state.category3List"
          :key="c3.id"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script name="CategorySelector" lang="ts" setup>
import { getCategorys1, getCategorys2, getCategorys3 } from '@/api'
import { reactive, onMounted } from 'vue'

let state = reactive<any>({
  category1List: [], // 一级分类列表
  category2List: [], // 二级分类列表
  category3List: [], // 三级分类列表
  category1Id: '', // 选择的一级分类id
  category2Id: '', // 选择的二级分类id
  category3Id: '', // 选择的三级分类id
  disabled: false, // 是否禁用select
})

onMounted(() => {
  getCategory1List()
})

const emit = defineEmits(['categoryChange'])

/**
 * @description: 异步获取一级分类列表显示
 * @returns {*}
 */
const getCategory1List = async () => {
  const result = await getCategorys1()
  const category1List = result.data
  state.category1List = category1List
}

/**
 * @description: 选中的一级分类ID发生变化的事件回调
 * @param {*} idName
 * @returns {*}
 */
const handleCategory1Change = async (idName: any) => {
  const [categoryId, categoryName] = idName.split('__')
  // 分发分类ID发生改变的事件
  emit('categoryChange', { categoryId, categoryName, level: 1 })

  // 重置二/三分类数据
  state.category2List = []
  state.category2Id = ''
  state.category3List = []
  state.category3Id = ''

  // 请求获取二级分类列表显示
  const result = await getCategorys2(categoryId)
  state.category2List = result.data
}

/**
 * @description: 选中的二级分类ID发生变化的事件回调
 * @param {*} idName
 * @returns {*}
 */
const handleCategory2Change = async (idName: any) => {
  const [categoryId, categoryName] = idName.split('__')

  // 分发分类ID发生改变的事件
  emit('categoryChange', { categoryId, categoryName, level: 2 })

  // 重置三分类数据
  state.category3List = []
  state.category3Id = ''

  // 请求获取三级分类列表显示
  const result = await getCategorys3(categoryId)
  state.category3List = result.data
}

/**
 * @description: 选中的三级分类ID发生变化的事件回调
 * @param {*} idName
 * @returns {*}
 */
const handleCategory3Change = (idName: any) => {
  const [categoryId, categoryName] = idName.split('__')
  // 分发分类ID发生改变的事件
  emit('categoryChange', { categoryId, categoryName, level: 3 })
}
</script>
<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
