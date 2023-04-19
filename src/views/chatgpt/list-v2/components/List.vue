<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="用户昵称"></el-table-column>
      <el-table-column prop="roleName" label="角色列表"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" label="更新时间"></el-table-column>
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
