<template>
  <div class="app-container">
    <el-tabs v-model="activeTab" v-loading="loading" type="border-card">
      <el-tab-pane label="版本更新" name="version">
        <el-form ref="form" :model="form" label-width="200px">
          <el-form-item label="是否强制更新">
            <el-switch v-model="form.version_force_update" active-color="#13ce66" inactive-color="#ff4949" />
          </el-form-item>
          <el-form-item label="版本号">
            <el-input v-model="form.version_code" placeholder="版本号" />
          </el-form-item>
          <el-form-item label="版本名称">
            <el-input v-model="form.version_name" placeholder="版本名称" />
          </el-form-item>
          <el-form-item label="版本信息">
            <el-input v-model="form.version_info" type="textarea" :rows="2" placeholder="版本信息" />
          </el-form-item>
          <el-form-item label="安卓版本下载链接">
            <el-upload
              class="upload"
              :action="upAction"
              :headers="upHeaders"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleSuccess"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="IOS版本下载链接">
            <el-input v-model="form.version_download_url_ios" placeholder="版本下载链接" />
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
import { deepClone } from '../../utils'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      activeTab: 'version',
      loading: false,
      form: {
        version_force_update: '',
        version_code: '',
        version_name: '',
        version_info: '',
        version_download_url: '',
        version_download_url_ios: ''
      },
      upAction: process.env.VUE_APP_BASE_API + '/up',
      upHeaders: {
        Authorization: getToken()
      },
      fileList: []
    }
  },
  created() {
    this.getConfig()
  },
  methods: {
    async getConfig() {
      if (this.$store.getters.username !== 'demo') {
        const res = await getData()
        this.form = deepClone(res.data)
        this.version_download_url = res.data.version_download_url
        if (this.version_download_url) {
          this.fileList.push({
            name: this.version_download_url,
            url: this.version_download_url
          })
        }
      }
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
    handleRemove(file, fileList) {
      this.fileList = []
      this.form.version_download_url = ''
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleSuccess(res, file) {
      if (res.code === 200) {
        this.form.version_download_url = res.data.url
      } else {
        this.$message({
          type: 'error',
          message: res.msg
        })
      }
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
