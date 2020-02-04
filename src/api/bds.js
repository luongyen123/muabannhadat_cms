import request from '../service/api'

export function getList(data) {
    return request({
        url: 'admin/getTinBds',
        method: 'post',
        data
    })
}