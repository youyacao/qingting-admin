<template>
  <div class="app-container">
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="基础配置" name="index">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="站点状态">
            <el-switch v-model="form.base_site_status" active-color="#13ce66" inactive-color="#ff4949" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保 存</el-button>
            <el-button @click="onBack">返 回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="邮箱配置" name="email">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="SMTP地址">
            <el-input v-model="form.email_smtp" />
          </el-form-item>
          <el-form-item label="SMTP端口">
            <el-input v-model="form.email_smtp_port" />
          </el-form-item>
          <el-form-item label="发信人邮箱">
            <el-input v-model="form.email_account" autocomplete="off" />
          </el-form-item>
          <el-form-item label="发信人授权码">
            <el-input v-model="form.email_password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="有效时间(秒)">
            <el-input v-model="form.email_valid_time" />
          </el-form-item>
          <el-form-item label="发信人名称">
            <el-input v-model="form.email_name" />
          </el-form-item>
          <el-form-item label="注册验证码模板">
            <el-input v-model="form.email_code_template" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="{验证码} 为自动替换" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保 存</el-button>
            <el-button @click="onBack">返 回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { saveData, getData } from '../../api/config'
export default {
  data() {
    return {
      activeTab: 'index',
      loading: false,
      form: {
        base_site_status: false,
        email_smtp: '',
        email_smtp_port: '',
        email_account: '',
        email_password: '',
        email_name: '',
        email_interval_time: 60,
        email_valid_time: 600,
        email_day_error_time: 5,
        email_code_template: ''
      }
    }
  },
  created() {
    this.getConfig()
  },
  methods: {
    async getConfig() {
      const res = await getData()
      if (res.data.base_site_status === '1') {
        this.form.base_site_status = true
      } else {
        this.form.base_site_status = false
      }
      this.form.email_smtp = res.data.email_smtp
      this.form.email_smtp_port = res.data.email_smtp_port
      this.form.email_account = res.data.email_account
      this.form.email_password = res.data.email_password
      this.form.email_name = res.data.email_name
      this.form.email_interval_time = res.data.email_interval_time
      this.form.email_valid_time = res.data.email_valid_time
      this.form.email_day_error_time = res.data.email_day_error_time
      this.form.email_code_template = res.data.email_code_template
    },
    async onSubmit() {
      if (this.loading) {
        return
      }
      this.loading = true
      const res = await saveData(this.form)
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
