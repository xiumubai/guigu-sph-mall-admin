<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu
      v-if="subItem.children && subItem.children.length > 0"
      :index="subItem.path"
    >
      <template #title>
        <el-icon>
          <component :is="subItem.meta.icon"></component>
        </el-icon>
        <span>{{ subItem.meta.title }}</span>
      </template>
      <sub-menu :menuList="subItem.children" />
    </el-sub-menu>
    <el-menu-item
      v-else
      :index="subItem.path"
      @click="handleClickMenu(subItem)"
    >
      <el-icon>
        <component :is="subItem.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { Menu } from '@element-plus/icons-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SubMenu',
  props: {
    menuList: {
      type: Menu.MenuOptions,
      default: () => {
        return []
      },
    },
  },
  setup() {
    function handleClickMenu(subItem: Menu.MenuOptions) {
      console.log(subItem)
    }
    return {
      handleClickMenu,
    }
  },
})
</script>
