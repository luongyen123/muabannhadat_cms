import request from '../service/api'

export function upload(data) {
    return request({
        url: 'media/upload',
        method: 'post',
        data
    })
}
