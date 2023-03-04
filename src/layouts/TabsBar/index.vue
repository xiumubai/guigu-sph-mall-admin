<!--
 * @Description: tabsBar 模块
 * @Autor: 李海波
 * @Date: 2023-03-02 17:50:49
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-03-04 11:28:55
-->
<template>
  <div class="tabs-bar-container">
    <div class="tabs-content">
      <el-tabs
        type="card"
        v-model="activeTabsValue"
        @tab-click="tabClick"
        @tab-remove="removeTab"
      >
        <el-tab-pane
          v-for="item in visitedViews"
          type="card"
          :key="item.path"
          :path="item.path"
          :label="item.title"
          :name="item.path"
          :closable="!(item.meta && item.meta.affix)"
        >
          <template #label>
            <el-icon class="tabs-icon" v-if="item.meta && item.meta.icon">
              <component :is="item.meta.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onMounted, watch } from 'vue'
import { useTabsBarStore } from '@/store/modules/tabsBar'
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
import { TabsPaneContext, TabPaneName } from 'element-plus'
import path from 'path-browserify'
import { useAuthStore } from '@/store/modules/auth'
import { routersType } from './types'
export default defineComponent({
  setup() {
    const tabsBarStore = useTabsBarStore()
    const authStore = useAuthStore()
    const routes = computed(() => authStore.authMenuList)
    const visitedViews = computed<routersType[]>(
      () => tabsBarStore.visitedViews,
    )
    const route = useRoute()
    const router = useRouter()
    let affixTags = ref<RouteRecordRaw[]>([])

    // 添加当前路由
    const addTags = () => {
      const { name } = route
      if (name === 'Login') {
        return
      }
      if (name) {
        tabsBarStore.addView(route as unknown as RouteRecordRaw)
      }
      return false
    }

    function filterAffixTags(routes: RouteRecordRaw[], basePath = '/') {
      let tags = [] as any
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          // 获取 path
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
          })
        }
        if (route.children) {
          const tempTags = filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    }

    /**
     * @description: 拿到需要固定的路由表，添加进 store
     * @author: codeBo
     */
    const initTags = () => {
      let routesNew = routes.value as RouteRecordRaw[]
      let affixTag = (affixTags.value = filterAffixTags(routesNew))
      for (const tag of affixTag) {
        if (tag.name) {
          tabsBarStore.addVisitedView(tag)
        }
      }
    }

    onMounted(() => {
      initTags()
      addTags()
    })
    watch(route, () => {
      addTags()
    })
    const activeTabsValue = computed({
      get: () => {
        return tabsBarStore.activeTabsValue
      },
      set: (val) => {
        tabsBarStore.setTabsMenuValue(val)
      },
    })

    // 删除以后切换到下一个
    function toLastView(activeTabPath: string) {
      let index = visitedViews.value.findIndex(
        (item) => item.path === activeTabPath,
      )
      const nextTab =
        visitedViews.value[index + 1] || visitedViews.value[index - 1]
      if (!nextTab) return
      router.push(nextTab.path)
      tabsBarStore.addVisitedView(nextTab)
    }

    // 点击事件
    const tabClick = (tabItem: TabsPaneContext) => {
      let path = tabItem.props.name as string
      router.push(path)
    }
    const isActive = (path: string): boolean => {
      return path === route.path
    }
    const removeTab = async (activeTabPath: TabPaneName): Promise<any> => {
      if (isActive(activeTabPath as string)) {
        toLastView(activeTabPath as string)
      }
      await tabsBarStore.delView(activeTabPath)
    }
    return {
      activeTabsValue,
      tabClick,
      removeTab,
      visitedViews,
    }
  },
})
</script>

<style scoped lang="scss">
.tabs-bar-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-content: center;
  align-items: flex-end;
  justify-content: space-between;
  height: $base-tabs-bar-height;
  padding-right: $base-padding;
  padding-left: $base-padding;
  user-select: none;
  background: $base-color-white;
  border-top: 1px solid #f6f6f6;

  .tabs-content {
    width: calc(100% - 0px);
  }

  :deep(.el-tabs--card) {
    height: $base-tag-item-height;

    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      height: $base-tag-item-height;
      line-height: $base-tag-item-height;
    }

    .el-tabs__header {
      margin: 0;
      border-bottom: 0;
    }

    .el-tabs__nav {
      border: 0;
    }

    .el-tabs__item {
      box-sizing: border-box;
      height: $base-tag-item-height;
      line-height: $base-tag-item-height;
      border: none;
      border-radius: $base-border-radius;
      transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
    }

    .el-tabs__item.is-active {
      background-color: #e8f4ff;
      mask: url('@/assets/images/tabbar-bg.png');
      mask: url('@/assets/images/tabbar-bg.png');
      mask-size: 100% 100%;
      mask-size: 100% 100%;
    }

    .el-tabs__item:not(.is_active):hover {
      background-color: #f6f8f9;
      mask: url('@/assets/images/tabbar-bg.png');
      mask: url('@/assets/images/tabbar-bg.png');
      mask-size: 100% 100%;
      mask-size: 100% 100%;
    }
  }
}
</style>
