import {getList} from '../../api/form'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    getList({commit}, formData) {
        const {page} = formData
        return new Promise((resolve, reject) => {
            getList({page: page}).then(reponse => {
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
  