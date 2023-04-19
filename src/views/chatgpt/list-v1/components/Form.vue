<template>
  <div>
    <el-form :model="formData">
      <el-form-item label="姓名">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model.number="formData.age"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    data: Object,
  },
  data() {
    return {
      formData: {
        id: 0,
        name: '',
        age: 0,
      },
    }
  },
  watch: {
    data(val) {
      if (val) {
        this.formData = Object.assign({}, val)
      } else {
        this.formData = {
          id: 0,
          name: '',
          age: 0,
        }
      }
    },
  },
  methods: {
    submit() {
      this.$emit('submit', this.formData)
    },
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>
