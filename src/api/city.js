import request from '../service/api'

export function getCity() {
    return request({
        url: 'location/getCity',
        method: 'post'
    })
}
