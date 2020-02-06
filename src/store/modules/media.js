import {upload} from '../../api/media'

const state = {
}

const mutations = {
}

const actions = {
    //user login
    upload({commit},formData) {
        let { image, folder} = formData
        return new Promise((resolve, reject) => {
            upload({media: JSON.stringify(image), folder: folder }).then(reponse => {
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
  