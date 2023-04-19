<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="filterText" placeholder="输入关键词搜索"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="add">新增</el-button>
      </el-col>
    </el-row>
    <list :tableData="tableData" @edit="edit" @remove="remove"></list>

    <el-dialog title="编辑" v-model="dialogVisible">
      <VForm :data="dialogData" @submit="submit" @cancel="cancel"></VForm>
    </el-dialog>
  </div>
</template>

<script>
import List from './components/List.vue'
import VForm from './components/Form.vue'
import { getAclUserList } from '@/api'
export default {
  components: {
    List,
    VForm,
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogData: null,
      filterText: '',
      pageSize: 10,
      pageNum: 1,
    }
  },
  computed: {
    filteredData() {
      if (this.filterText) {
        return this.tableData.filter((item) => {
          return Object.values(item).some((val) => {
            return (
              val
                .toString()
                .toLowerCase()
                .indexOf(this.filterText.toLowerCase()) !== -1
            )
          })
        })
      } else {
        return this.tableData
      }
    },
  },
  methods: {
    add() {
      this.dialogVisible = true
      this.dialogData = null
    },
    edit(row) {
      this.dialogVisible = true
      this.dialogData = row
    },
    remove(row) {
      console.log(row)
    },
    submit(data) {
      if (data.id === 0) {
        data.id = this.tableData.length + 1
        this.tableData.push(data)
      } else {
        const index = this.tableData.findIndex((item) => item.id === data.id)
        if (index !== -1) {
          this.tableData.splice(index, 1, data)
        }
      }
      this.dialogVisible = false
      this.dialogData = null
    },
    cancel() {
      this.dialogVisible = false
      this.dialogData = null
    },
    async init() {
      const res = await getAclUserList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })
      this.tableData = res.data.records
    },
  },
  async mounted() {
    this.init()
  },
}
</script>
