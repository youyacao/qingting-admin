import request from '@/utils/request'

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
