<template>
  <div class="app-container">
    <el-tabs v-model="activeTab" v-loading="loading" type="border-card">
      <el-tab-pane label="基础配置" name="base">
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
      <el-tab-pane label="视频配置" name="video">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="观看视频是否要登陆">
            <el-switch v-model="form.base_video_need_login" active-color="#13ce66" inactive-color="#ff4949" />
          </el-form-item>
          <el-form-item label="免费试看次数">
            <el-input v-model="form.base_video_free_time" placeholder="0代表不限制次数（需开启登陆）" />
          </el-form-item>
          <el-form-item label="免费试看时长">
            <el-input v-model="form.base_video_free_duration" placeholder="0代表不限制时长（需开启登陆）" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保 存</el-button>
            <el-button @click="onBack">返 回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="直播配置" name="live">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="观看直播是否要登陆">
            <el-switch v-model="form.base_live_need_login" active-color="#13ce66" inactive-color="#ff4949" />
          </el-form-item>
          <el-form-item label="免费试看次数">
            <el-input v-model="form.base_live_free_time" placeholder="0代表不限制次数（需开启登陆）" />
          </el-form-item>
          <el-form-item label="免费试看时长">
            <el-input v-model="form.base_live_free_duration" placeholder="0代表不限制时长（需开启登陆）" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保 存</el-button>
            <el-button @click="onBack">返 回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="评论配置" name="comment">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="评论需要过滤的关键字">
            <el-input v-model="form.comment_forbid_keys" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="英文逗号分隔" />
          </el-form-item>
          <el-form-item label="评论是否开启审核">
            <el-switch v-model="form.comment_open_check" active-color="#13ce66" inactive-color="#ff4949" />
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
      <el-tab-pane label="短信配置" name="sms">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="APPID">
            <el-input v-model="form.sms_appid" />
          </el-form-item>
          <el-form-item label="APPKEY">
            <el-input v-model="form.sms_appkey" />
          </el-form-item>
          <el-form-item label="有效时间(秒)">
            <el-input v-model="form.sms_valid_time" />
          </el-form-item>
          <el-form-item label="每天最多错误次数">
            <el-input v-model="form.sms_day_error_num" />
          </el-form-item>
          <el-form-item label="注册验证码模板">
            <el-input v-model="form.sms_code_template" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="{验证码} 为自动替换" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保 存</el-button>
            <el-button @click="onBack">返 回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="上传配置" name="upload">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="上传文件类型">
            <el-input v-model="form.upload_file_ext" placeholder="用|分隔类型（如：png|jpg|gif）" />
          </el-form-item>
          <el-form-item label="上传文件大小限制（M）">
            <el-input v-model="form.upload_max_size" />
          </el-form-item>
          <el-form-item label="七牛云开关">
            <el-switch v-model="form.upload_qiniu_status" active-color="#13ce66" inactive-color="#ff4949" />
          </el-form-item>
          <el-form-item label="七牛云公钥">
            <el-input v-model="form.upload_qiniu_accessKey" />
          </el-form-item>
          <el-form-item label="七牛云私钥">
            <el-input v-model="form.upload_qiniu_secretKey" />
          </el-form-item>
          <el-form-item label="七牛云bucket">
            <el-input v-model="form.upload_qiniu_bucket" />
          </el-form-item>
          <el-form-item label="七牛云domain">
            <el-input v-model="form.upload_qiniu_domain" />
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
      activeTab: 'base',
      loading: false,
      form: {
        base_site_status: false,
        base_video_need_login: false,
        base_video_free_time: '',
        base_video_free_duration: '',
        base_live_need_login: false,
        base_live_free_time: '',
        base_live_free_duration: '',
        comment_forbid_keys: '',
        comment_open_check: false,
        email_smtp: '',
        email_smtp_port: '',
        email_account: '',
        email_password: '',
        email_name: '',
        email_interval_time: 60,
        email_valid_time: 600,
        email_day_error_time: 5,
        email_code_template: '',
        sms_appid: '',
        sms_appkey: '',
        sms_valid_time: '',
        sms_day_error_num: '',
        sms_code_template: '',
        upload_file_ext: '',
        upload_max_size: '',
        upload_qiniu_status: false,
        upload_qiniu_accessKey: '',
        upload_qiniu_secretKey: '',
        upload_qiniu_bucket: '',
        upload_qiniu_domain: ''
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
      if (res.data.base_video_need_login === '1') {
        this.form.base_video_need_login = true
      } else {
        this.form.base_video_need_login = false
      }
      this.form.base_video_free_time = res.data.base_video_free_time
      this.form.base_video_free_duration = res.data.base_video_free_duration
      if (res.data.base_live_need_login === '1') {
        this.form.base_live_need_login = true
      } else {
        this.form.base_live_need_login = false
      }
      this.form.base_live_free_time = res.data.base_live_free_time
      this.form.base_live_free_duration = res.data.base_live_free_duration
      this.form.comment_forbid_keys = res.data.comment_forbid_keys
      if (res.data.comment_open_check === '1') {
        this.form.comment_open_check = true
      } else {
        this.form.comment_open_check = false
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
      this.form.sms_appid = res.data.sms_appid
      this.form.sms_appkey = res.data.sms_appkey
      this.form.sms_valid_time = res.data.sms_valid_time
      this.form.sms_day_error_num = res.data.sms_day_error_num
      this.form.sms_code_template = res.data.sms_code_template
      this.form.upload_file_ext = res.data.upload_file_ext
      this.form.upload_max_size = res.data.upload_max_size
      if (res.data.upload_qiniu_status === '1') {
        this.form.upload_qiniu_status = true
      } else {
        this.form.upload_qiniu_status = false
      }
      this.form.upload_qiniu_accessKey = res.data.upload_qiniu_accessKey
      this.form.upload_qiniu_secretKey = res.data.upload_qiniu_secretKey
      this.form.upload_qiniu_bucket = res.data.upload_qiniu_bucket
      this.form.upload_qiniu_domain = res.data.upload_qiniu_domain
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
