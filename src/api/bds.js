import request from '../service/api'

export function getList(data) {
    return request({
        url: 'admin/getTinBds',
        method: 'post',
        data
    })
}
export function create(data) {
    return request({
        url: 'bds/create',
        method: 'post',
        data
    })
}
export function update(data) {
    return request({
        url: 'admin/updateTin',
        method: 'post',
        data
    })
}