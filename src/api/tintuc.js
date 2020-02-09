import request from '../service/api'

export function getList(data) {
    return request({
        url: 'tintuc/getList',
        method: 'post',
        data
    })
}
export function create(data) {
    return request({
        url: 'admin/createTintuc',
        method: 'post',
        data
    })
}
export function update(data) {
    return request({
        url: 'admin/updateTintuc',
        method: 'post',
        data
    })
}
export function del(data) {
    return request({
        url: 'admin/delTintuc',
        method: 'post',
        data
    })
}