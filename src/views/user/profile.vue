<template>
  <div class="app-container">
    <el-card>
      <div slot="header">个人设置</div>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" :disabled="true" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="VIP过期时间">
          <el-date-picker v-model="form.vip_end_time" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保 存</el-button>
          <el-button @click="onBack">返 回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updateProfile } from '../../api/users'
import { getInfo } from '../../api/user'
export default {
  data() {
    return {
      activeTab: 'index',
      loading: false,
      form: {
        username: '',
        phone: '',
        email: '',
        vip_end_time: ''
      }
    }
  },
  created() {
    this.user()
  },
  methods: {
    async user() {
      const res = await getInfo()
      this.form.username = res.data.username
      this.form.phone = res.data.phone
      this.form.email = res.data.email
      if (res.data.vip_end_time !== '0000-00-00') {
        this.form.vip_end_time = res.data.vip_end_time
      }
    },
    async onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      const res = await updateProfile(this.form)
      this.loading = false
      this.$message({
        type: (res.code === 200) ? 'success' : 'error',
        message: res.msg
      })
    },
    onBack() {
      this.$router.go(-1)
    }
  }
}
</script>
