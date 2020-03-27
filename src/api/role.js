import request from '@/utils/request'

export function getRoles() {
  return request({
    url: 'permission/roles',
    method: 'get',
    params: { page: 1, limit: 10 }
  })
}

export function getDatas(page, limit) {
  return request({
    url: 'permission/roles',
    method: 'get',
    params: { page: page, limit: limit }
  })
}

export function addData(data) {
  return request({
    url: 'permission/roles',
    method: 'post',
    data
  })
}

export function updateData(id, data) {
  return request({
    url: `permission/roles/${id}`,
    method: 'put',
    data
  })
}

export function deleteData(id) {
  return request({
    url: `permission/roles/${id}`,
    method: 'delete'
  })
}
