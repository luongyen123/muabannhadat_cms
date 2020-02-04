import {login} from '../../api/user'
import router from '../../router'
import { getToken, getRole, setToken, setRole, setCurrentUser, removeRole, removeToken, removeCurrentUser } from '../../utils/auth'

const state = {
    token: getToken(),
    role: getRole(),
    userCurrent: {}
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
        setToken(token)
    },
    SET_USER: (state, user) => {
        state.user = user
        setCurrentUser(user)
    },
    SET_ROLE: (state,role) => {
        state.role = role
        setRole(role)
    }
}

const actions = {
    //user login
    login({ commit}, userInfo) {
        const { email, password } = userInfo
        return new Promise((resolve, reject) => {
            login({email: email.trim(), password: password}).then(reponse => {
                const { data }= reponse
                console.log(data)
                commit('SET_TOKEN', data.token)
                commit('SET_USER', data.user)
                commit('SET_ROLE', data.user.role)
                resolve()
            }).catch( error => {
                reject(error)
            })
        })
    },
    logout({}) {
        return new Promise((resolve, reject) => {
            logout().then(reponse => {
                const { data }= reponse
                removeRole()
                removeToken()
                removeCurrentUser()
                resolve()
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
  