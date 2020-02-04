import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user'
import bds from './modules/bds'

Vue.use(Vuex)
export default new Vuex.Store({
    modules : {
        user: userModule,
        bds: bds
    }
})