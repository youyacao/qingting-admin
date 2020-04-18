<template>
  <div class="app-container">
    <el-tabs v-model="activeTab" v-loading="loading" type="border-card">
      <el-tab-pane label="基础配置" name="base">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="站点状态">
            <el-switch v-model="form.base_site_status" active-color="#13ce66" inactive-color="#ff4949" />
          </el-form-item>
          <el-form-item label="默认头像">
            <el-upload
              ref="uploadAvatar"
              class="avatar-uploader"
              :action="upAction"
              :headers="upHeaders"
              :limit="1"
              :show-file-list="false"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <img v-if="avatar_url" :src="avatar_url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="金币换算单位">
            <el-input v-model="form.base_gold_unit" placeholder="1元人民币等于多少金币数" />
          </el-form-item>
          <el-form-item label="推荐奖励金币最小值">
            <el-input v-model="form.base_gold_min_award" />
          </el-form-item>
          <el-form-item label="推荐奖励金币最大值">
            <el-input v-model="form.base_gold_max_award" />
          </el-form-item>
          <el-form-item label="最低提现金币数">
            <el-input v-model="form.base_low_withdraw_gold" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保 存</el-button>
            <el-button @click="onBack">返 回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="内容配置" name="content">
        <el-form ref="form" :model="form" label-width="200px">
          <el-divider content-position="center">视频配置</el-divider>
          <el-form-item label="视频是否开启审核">
            <el-switch v-model="form.base_video_open_check" active-color="#13ce66" inactive-color="#ff4949" />
          </el-form-item>
          <el-form-item label="观看视频是否要登陆">
            <el-switch v-model="form.base_video_need_login" active-color="#13ce66" inactive-color="#ff4949" />
          </el-form-item>
          <el-form-item label="观看几个视频出现广告">
            <el-input v-model="form.base_video_show_ad" placeholder="0代表不出现广告" />
          </el-form-item>
          <el-form-item label="免费试看次数">
            <el-input v-model="form.base_video_free_num" placeholder="0代表不限制个数（需开启登陆）" />
          </el-form-item>
          <el-form-item label="免费试看时长">
            <el-input v-model="form.base_video_free_duration" placeholder="0代表不限制时长（需开启登陆）" />
          </el-form-item>
          <el-divider content-position="center">直播配置</el-divider>
          <el-form-item label="观看直播是否要登陆">
            <el-switch v-model="form.base_live_need_login" active-color="#13ce66" inactive-color="#ff4949" />
          </el-form-item>
          <el-form-item label="免费试看次数">
            <el-input v-model="form.base_live_free_num" placeholder="0代表不限制个数（需开启登陆）" />
          </el-form-item>
          <el-form-item label="免费试看时长">
            <el-input v-model="form.base_live_free_duration" placeholder="0代表不限制时长（需开启登陆）" />
          </el-form-item>
          <el-divider content-position="center">图文配置</el-divider>
          <el-form-item label="图文是否开启审核">
            <el-switch v-model="form.article_open_check" active-color="#13ce66" inactive-color="#ff4949" />
          </el-form-item>
          <el-divider content-position="center">评论配置</el-divider>
          <el-form-item label="评论是否开启审核">
            <el-switch v-model="form.comment_open_check" active-color="#13ce66" inactive-color="#ff4949" />
          </el-form-item>
          <el-form-item label="评论需要过滤的关键字">
            <el-input v-model="form.comment_forbid_keys" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="英文逗号分隔" />
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
          <el-form-item label="云片网APIKEY">
            <el-input v-model="form.sms_apikey" />
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
          <el-form-item label="上传图片类型">
            <el-input v-model="form.upload_file_ext" placeholder="用|分隔类型（如：png|jpg|gif）" />
          </el-form-item>
          <el-form-item label="上传文件大小限制（M）">
            <el-input v-model="form.upload_max_size" />
          </el-form-item>
          <el-form-item label="上传视频类型">
            <el-input v-model="form.upload_video_file_ext" placeholder="用|分隔类型（如：mp4）" />
          </el-form-item>
          <el-form-item label="上传视频大小限制（M）">
            <el-input v-model="form.upload_video_max_size" />
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
          <el-form-item label="七牛云视频截图">
            <el-input v-model="form.upload_qiniu_video_thumb" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保 存</el-button>
            <el-button @click="onBack">返 回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="支付配置" name="pay">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="商户ID">
            <el-input v-model="form.pay_accesskey" />
          </el-form-item>
          <el-form-item label="商户秘钥">
            <el-input v-model="form.pay_secretkey" />
          </el-form-item>
          <el-form-item label="callback地址">
            <el-input v-model="form.pay_callback_url" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保 存</el-button>
            <el-button @click="onBack">返 回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="登陆配置" name="login">
        <el-divider content-position="center">微信配置</el-divider>
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="微信公钥">
            <el-input v-model="form.login_weixin_key" />
          </el-form-item>
          <el-form-item label="微信秘钥">
            <el-input v-model="form.login_weixin_secret" />
          </el-form-item>
          <el-divider content-position="center">QQ配置</el-divider>
          <el-form-item label="QQ公钥">
            <el-input v-model="form.login_qq_key" />
          </el-form-item>
          <el-form-item label="QQ秘钥">
            <el-input v-model="form.login_qq_secret" />
          </el-form-item>
          <el-divider content-position="center">微博配置</el-divider>
          <el-form-item label="微博公钥">
            <el-input v-model="form.login_weibo_key" />
          </el-form-item>
          <el-form-item label="微博秘钥">
            <el-input v-model="form.login_weibo_secret" />
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
import { getToken } from '../../utils/auth'
import { deepClone } from '../../utils'
export default {
  data() {
    return {
      activeTab: 'base',
      loading: false,
      avatar_url: '',
      upAction: process.env.VUE_APP_BASE_API + '/upload',
      upHeaders: {
        Authorization: getToken()
      },
      form: {
        base_site_status: false,
        base_default_avatar: '',
        base_gold_unit: '',
        base_gold_min_award: '',
        base_gold_max_award: '',
        base_low_withdraw_gold: '',
        base_video_need_login: false,
        base_video_show_ad: '',
        base_video_free_time: '',
        base_video_free_duration: '',
        base_video_open_check: false,
        base_live_need_login: false,
        base_live_free_time: '',
        base_live_free_duration: '',
        article_open_check: false,
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
        sms_apikey: '',
        sms_valid_time: '',
        sms_day_error_num: '',
        sms_code_template: '',
        upload_file_ext: '',
        upload_max_size: '',
        upload_video_file_ext: '',
        upload_video_max_size: '',
        upload_qiniu_status: false,
        upload_qiniu_accessKey: '',
        upload_qiniu_secretKey: '',
        upload_qiniu_bucket: '',
        upload_qiniu_domain: '',
        upload_qiniu_video_thumb: '',
        pay_accesskey: '',
        pay_secretkey: '',
        pay_callback_url: '',
        login_weixin_key: '',
        login_weixin_secret: '',
        login_weixin_redirect_uri: '',
        login_qq_key: '',
        login_qq_secret: '',
        login_qq_redirect_uri: '',
        login_weibo_key: '',
        login_weibo_secret: '',
        login_weibo_redirect_uri: ''
      }
    }
  },
  created() {
    this.getConfig()
  },
  methods: {
    async getConfig() {
      const res = await getData()
      this.form = deepClone(res.data)
      this.avatar_url = res.data.base_default_avatar_url
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
    },
    handleSuccess(res, file) {
      if (res.code === 200) {
        this.form.base_default_avatar = res.data.img_url
        this.avatar_url = URL.createObjectURL(file.raw)
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
      this.$refs['uploadAvatar'].clearFiles()
    },
    beforeUpload(file) {
      return true
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
