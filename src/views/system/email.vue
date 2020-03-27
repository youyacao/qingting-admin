<template>
  <div class="app-container">
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="邮箱配置" name="email">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="发信人用户名">
            <el-input v-model="form.email_username" size="small"></el-input>
          </el-form-item>
          <el-form-item label="发信人密码">
            <el-input v-model="form.email_password" show-password></el-input>
          </el-form-item>
          <el-form-item label="发信人名称">
            <el-input v-model="form.email_title"></el-input>
          </el-form-item>
          <el-form-item label="SMTP地址">
            <el-input v-model="form.email_smtp"></el-input>
          </el-form-item>
          <el-form-item label="发送间隔时间(秒)">
            <el-input v-model="form.email_interval_time"></el-input>
          </el-form-item>
          <el-form-item label="有效时间(秒)">
            <el-input v-model="form.email_valid_time"></el-input>
          </el-form-item>
          <el-form-item label="每天最多错误次数">
            <el-input v-model="form.email_day_error_time"></el-input>
          </el-form-item>
          <el-form-item label="注册验证码模板">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="{验证码} 为自动替换" v-model="form.email_code_template"></el-input>
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
export default {
  data() {
    return {
      activeTab: 'email',
      form: {
        email_username: '',
        email_password: '',
        email_title: '',
        email_smtp: '',
        email_interval_time: 60,
        email_valid_time: 600,
        email_day_error_time: 5,
        email_code_template: ''
      }
    }
  },
  methods: {
    onSubmit() {
    },
    onBack() {
      this.$router.go(-1)
    }
  }
}
</script>
