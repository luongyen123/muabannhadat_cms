import {getDistrict} from '../../api/district'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    getDistrict({commit}, formData) {
        const {city_code} = formData
        return new Promise((resolve, reject) => {
            getDistrict({city_code: city_code}).then(reponse => {
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
  