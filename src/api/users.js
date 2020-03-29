import request from '@/utils/request'

export function getData(id) {
  return request({
    url: `permission/users/${id}`,
    method: 'get'
  })
}

export function getDatas(data) {
  return request({
    url: 'permission/users',
    method: 'get',
    params: data
  })
}

export function addData(data) {
  return request({
    url: 'permission/users',
    method: 'post',
    data
  })
}

export function updateData(id, data) {
  return request({
    url: `permission/users/${id}`,
    method: 'put',
    data
  })
}

export function deleteData(id) {
  return request({
    url: `permission/users/${id}`,
    method: 'delete'
  })
}

export function updateProfile(data) {
  return request({
    url: `users/profile`,
    method: 'post',
    data
  })
}

export function batchDisable(data) {
  return request({
    url: `users/batchDisable`,
    method: 'post',
    data
  })
}
