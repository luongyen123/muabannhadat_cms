import {getList} from '../../api/bds'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    getList({commit},formData) {
        let { type, type_bds, city_code, district_code,address_code, price_min, price_max, money, next_page} = formData
        return new Promise((resolve, reject) => {
            getList({page: next_page, type: type, type_bds: type_bds, city_code: city_code, district_code: district_code, address_code: address_code, price_min: price_min, price_max: price_max, money: money }).then(reponse => {
                const { data }= reponse
                resolve(data)
            }).catch( error => {
                reject(error)
            })
        })
    },
    detail({commit},formData) {
        let { id } = formData
        return new Promise((resolve, reject) => {
            detail({id: id}).then(reponse => {
                const { data }= reponse
                resolve(data)
            }).catch( error => {
                reject(error)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  