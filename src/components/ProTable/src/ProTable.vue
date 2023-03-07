<template>
  <div class="card table">
    <!-- 表格头部 操作按钮 -->

    <!-- 表格主体 -->
    <el-table
      v-bind="$attrs"
      :data="tableData"
      :row-key="getRowKeys"
      :border="border"
    >
      <!-- default slot -->
      <slot></slot>
      <!-- render columns -->
      <template v-for="item in tableColumns" :key="item">
        <!-- selection || index -->
        <el-table-column
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type == 'selection'"
          v-if="item.type == 'selection' || item.type == 'index'"
        ></el-table-column>
        <!-- expend -->
        <el-table-column
          v-bind="item"
          :align="item.align ?? 'center'"
          v-if="item.type == 'expand'"
          v-slot="scope"
        >
          <component
            :is="item.render"
            :row="scope.row"
            v-if="item.render"
          ></component>
          <slot :name="item.type" :row="scope.row" v-else></slot>
        </el-table-column>
        <!-- other columns -->
        <TableColumn :column="item" v-if="!item.type && item.prop">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" :row="scope.row"></slot>
          </template>
        </TableColumn>
      </template>
      <!-- 插入表格最后一行之后的插槽 -->
      <template #append>
        <slot name="append"></slot>
      </template>
      <!-- noData -->
      <template #empty>
        <div class="table-empty">
          <slot name="empty">
            <img src="@/assets/images/notData.png" alt="noData" />
            <div>暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <slot name="pagination">
      <Pagination
        v-if="pagination"
        :pageable="pageable"
        :handleSizeChange="handleSizeChange"
        :handleCurrentChange="handleCurrentChange"
      />
    </slot>
  </div>
</template>

<script lang="ts" setup name="ProTable">
import { ref } from 'vue'
import { useTable } from './hooks/useTable'
import { useSelection } from './hooks/useSelection'
import { ElTable, TableProps } from 'element-plus'
import TableColumn from './components/TableColumn.vue'
import Pagination from './components/Pagination.vue'
// import { Refresh, Printer, Operation, Search } from '@element-plus/icons-vue'
import type { ColumnProps, BreakPoint } from './types'

/**
 * @description: props类型定义
 * @param columns       - 列配置项
 * @param requestApi    - 请求表格数据的api ==> 必传
 * @param dataCallback  - 返回数据的回调函数，可以对数据进行处理 ==> 非必传
 * @param title         - 表格标题，目前只在打印的时候用到 ==> 非必传
 * @param pagination    - 是否需要分页组件 ==> 非必传（默认为true）
 * @param initParam     - 初始化请求参数 ==> 非必传（默认为{}）
 * @param border        - 是否带有纵向边框 ==> 非必传（默认为true）
 * @param toolButton    - 是否显示表格功能按钮 ==> 非必传（默认为true）
 * @param selectId      - 当表格数据多选时，所指定的字段名 ==> 非必传（默认为 id）
 * @param searchCol     - 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
 */
interface ProTableProps extends Partial<Omit<TableProps<any>, 'data'>> {
  columns: ColumnProps[]
  requestApi: (params: any) => Promise<any>
  dataCallback?: (data: any) => any
  title?: string
  pagination?: boolean
  initParam?: any
  border?: boolean
  toolButton?: boolean
  selectId?: string
  searchCol?: number | Record<BreakPoint, number>
}

// 🌟组件props的ts定义必须在组件中声明
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  pagination: true,
  initParam: {},
  border: true,
  toolButton: true,
  selectId: 'id',
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
})
// 是否显示搜索模块
// const isShowSearch = ref(true)

// 表格 DOM 元素
// const tableRef = ref<InstanceType<typeof ElTable>>()

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns)

// 表格多选 Hooks
const { getRowKeys } = useSelection(props.selectId)

// 表格操作 Hooks
const {
  tableData,
  pageable,

  handleSizeChange,
  handleCurrentChange,
} = useTable(
  props.requestApi,
  props.initParam,
  props.pagination,
  props.dataCallback,
)
</script>

<style lang="scss" scoped>
@import './style/index';
</style>
