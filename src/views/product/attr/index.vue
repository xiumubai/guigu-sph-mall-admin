<template>
  <div>
    <el-card>
      <CategorySelector @categoryChange="handleCategoryChange" ref="cs" />
    </el-card>
    <el-card style="margin: 20px 0">
      <div v-show="state.isShowList">
        <el-button
          type="primary"
          icon="Plus"
          style="margin-bottom: 20px"
          @click="showAdd"
          :disabled="!state.category3Id"
        >
          添加
        </el-button>
        <el-table :data="state.attrs" border v-loading="state.loading">
          <el-table-column
            label="序号"
            type="index"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            prop="attrName"
            width="150"
          ></el-table-column>
          <el-table-column label="属性值列表">
            <template v-slot="{ row }">
              <el-tag
                type="info"
                v-for="value in row.attrValueList"
                :key="value.id"
                style="margin-right: 5px"
              >
                {{ value.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template v-slot="{ row }">
              <el-button type="primary" icon="Edit" @click="showUpdate(row)">
                修改
              </el-button>
              <el-button type="danger" icon="Delete" @click="handleDelete(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!state.isShowList">
        <el-form inline>
          <el-form-item label="属性名">
            <el-input
              type="text"
              placeholder="请输入属性名"
              v-model="attr.attrName"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attr.attrName"
        >
          添加属性值
        </el-button>
        <el-button @click="state.isShowList = true">取消</el-button>

        <el-table border style="margin: 20px 0" :data="attr.attrValueList">
          <el-table-column
            label="序号"
            type="index"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template v-slot="{ row, $index }">
              <el-input
                :ref="$index"
                v-if="row.edit"
                v-model="row.valueName"
                placeholder="请输入名称"
                @blur="toList(row)"
              />
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: inline-block; width: 100%"
              >
                {{ row.valueName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row, $index }">
              <el-popconfirm
                :title="`确定删除 ${row.valueName} 吗?`"
                @onConfirm="attr.attrValueList.splice($index, 1)"
              >
                <el-button
                  style="margin-left: 10px"
                  type="danger"
                  icon="Delete"
                >
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-button
          type="primary"
          :disabled="!attr.attrName || attr.attrValueList.length === 0"
          @click="addOrUpdate"
        >
          保存
        </el-button>
        <el-button @click="state.isShowList = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { getAttrList, removeAttr, addAttr } from '@/api'
import { useHandleData } from '@/hooks/useHandleData'
import { Attr } from '@/api/product/types'
import { ElMessage } from 'element-plus'
const state = reactive<any>({
  loading: false, // 是否正在加载中
  category1Id: null, // 一级分类ID
  category2Id: null, // 二级分类ID
  category3Id: null, // 三级分类ID
  attrs: [], // 属性列表
  isShowList: true, // 是否显示属性列表界面, 如果是false显示添加&修改的界面
})

let attr = reactive<any>({
  attrName: '', // 属性名
  attrValueList: [], // 属性值列表
  categoryId: '', // 当前第3级分类ID
  categoryLevel: 3, // 分类级别
})

const handleCategoryChange = ({
  categoryId,
  level,
}: {
  categoryId: number
  level: number
}) => {
  if (level === 1) {
    // 重置二级与三级分类的数据
    state.category2Id = null
    state.category3Id = null
    state.attrs = [] // 重置属性列表

    state.category1Id = categoryId
  } else if (level === 2) {
    // 重置三级分类的数据
    state.category3Id = null
    state.attrs = [] // 重置属性列表

    state.category2Id = categoryId
  } else {
    state.category3Id = categoryId
    // 只有当选择了三级的分类ID, 才去请求获取属性列表
    getAttrs()
  }
}
const getAttrs = async () => {
  const { category1Id, category2Id, category3Id } = state
  state.loading = true
  const result = await getAttrList(category1Id, category2Id, category3Id)
  state.loading = false
  state.attrs = result.data
}

const showAdd = () => {
  // 重置数据
  attr = {
    attrName: '', // 属性名
    attrValueList: [], // 属性值列表
    categoryId: state.category3Id, // 当前第3级分类ID
    categoryLevel: 3, // 分类级别
  }
  state.isShowList = false
}

const showUpdate = (row: Attr.ResAttrList) => {
  attr = JSON.parse(JSON.stringify(row))
  // 显示更新界面
  state.isShowList = false
}

// *根据id删除品牌
const handleDelete = async (row: Attr.ResAttrList) => {
  await useHandleData(removeAttr, row.id, `删除${row.attrName}角色`)
  getAttrs()
}

const addAttrValue = () => {
  // 创建一个平台属性值对象
  const attrValue = {
    attrId: attr.id, // 当前要修改属性的id
    valueName: '', // 属性值名称
    edit: true, // 标识为编辑模式
  }

  // 添加到对应的数组
  attr.attrValueList.push(attrValue)
}

const toList = (attrValue: any) => {
  if (attrValue.valueName.trim() === '') return

  // 如果当前输入的与原本已有重复了, 那还是编辑模式并提示
  const isRepeat =
    attr.attrValueList.filter(
      (value: any) => value.valueName === attrValue.valueName,
    ).length === 2
  if (isRepeat) {
    ElMessage.warning('属性名称不能重复')
    attrValue.valueName = '' // 清除输入
    return
  }

  // 更新edit属性为false
  attrValue.edit = false
}

const toEdit = (attrValue: any, index: number) => {
  console.log(attrValue, index)

  // if (attrValue.hasOwnProperty('edit')) {
  //   attrValue.edit = true
  // } else {
  //   // 如果没有
  //   this.$set(attrValue, 'edit', true)
  // }
}

const addOrUpdate = async () => {
  attr.attrValueList = attr.attrValueList.filter((attrValue: any) => {
    if (attrValue.valueName) {
      // 删除attrValue对象中的edit属性
      delete attrValue.edit
      return true
    }
    return false
  })

  // 如果attr.attrValueList是空数组, 没有必要发请求, 直接提示
  if (attr.attrValueList.length === 0) {
    ElMessage.warning('至少指定一个属性值名称')
    return
  }

  try {
    await addAttr(attr)
    ElMessage.success('保存属性成功')
    state.isShowList = true
    getAttrs()
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped></style>
