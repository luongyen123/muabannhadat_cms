import request from '../service/api'

export function getAddress(data) {
    return request({
        url: 'location/getAddress',
        method: 'post',
        data
    })
}
