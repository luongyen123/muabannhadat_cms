import {getCity} from '../../api/city'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    getCity({commit}) {
        return new Promise((resolve, reject) => {
            getCity().then(reponse => {
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
  