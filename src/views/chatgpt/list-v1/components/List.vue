<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
    },
  },
  methods: {
    edit(row) {
      // 编辑操作
      this.$emit('edit', row)
      console.log(row)
    },
    remove(row) {
      // 删除操作
      this.$emit('remove', row)
      console.log(row)
    },
  },
}
</script>
