import request from '@/utils/request'

export function saveData(data) {
  return request({
    url: 'configSave',
    method: 'post',
    data
  })
}
