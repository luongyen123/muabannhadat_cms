import request from '../service/api'

export function getList(data) {
    return request({
        url: 'admin/getForm',
        method: 'post',
        data
    })
}
