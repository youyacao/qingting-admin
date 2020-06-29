import request from '@/utils/request'

export function getData(id) {
  return request({
    url: `goods/${id}`,
    method: 'get'
  })
}

export function getDatas(data) {
  return request({
    url: 'goods',
    method: 'get',
    params: data
  })
}

export function addData(data) {
  return request({
    url: 'goods',
    method: 'post',
    data
  })
}

export function updateData(id, data) {
  return request({
    url: `goods/${id}`,
    method: 'put',
    data
  })
}

export function deleteData(id) {
  return request({
    url: `goods/${id}`,
    method: 'delete'
  })
}

export function batchDisable(data) {
  return request({
    url: `goods/batchDisable`,
    method: 'post',
    data
  })
}

export function getTypeOptions() {
  return request({
    url: `goods/getTypeOptions`,
    method: 'post'
  })
}
