import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user'
import bds from './modules/bds'
import media from './modules/media'
import city from './modules/city'
import district from './modules/district'
import address from './modules/address'

Vue.use(Vuex)
export default new Vuex.Store({
    modules : {
        user: userModule,
        bds: bds,
        media: media,
        city: city,
        district: district,
        address: address
    }
})