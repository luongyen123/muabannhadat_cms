import {getAddress} from '../../api/address'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    getAddress({commit}, formData) {
        const {district_code} = formData
        return new Promise((resolve, reject) => {
            getAddress({district_code: district_code}).then(reponse => {
                const { data }= reponse
                resolve(data)
            }).catch( error => {
                reject(error)
            })
        })
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  