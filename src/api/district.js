import request from '../service/api'

export function getDistrict(data) {
    return request({
        url: 'location/getDistrict',
        method: 'post',
        data
    })
}
