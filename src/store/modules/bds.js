import {getList, create, update} from '../../api/bds'

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
    },
    create({commit},formData) {
        let { status,address_code, address_number,address_street, city_code,dai, description, district_code, hem, huong, media,money,number_roomNgu,number_roomTam,number_tang,price,rong,title,type,type_bds} = formData
        return new Promise((resolve, reject) => {
            create({status: status,address_code: address_code, address_number:address_number, 
                address_street: address_street,city_code: city_code, dai: dai, description: description,
                district_code: district_code, hem: hem, huong: huong, media: JSON.stringify(media), money: money,number_roomNgu: number_roomNgu, number_roomTam: number_roomTam, 
                number_tang: number_tang, price: price, rong: rong, title: title, type: type, type_bds: type_bds
            }).then(reponse => {
                const { data }= reponse
                resolve(data)
            }).catch( error => {
                reject(error)
            })
        })
    },
    update({commit},formData) {
        let { id,status,address_code, address_number,address_street, city_code,dai, description, district_code, hem, huong, media,money,number_roomNgu,number_roomTam,number_tang,price,rong,title,type,type_bds} = formData
        return new Promise((resolve, reject) => {
            update({id: id, status: status,address_code: address_code, address_number:address_number, 
                address_street: address_street,city_code: city_code, dai: dai, description: description,
                district_code: district_code, hem: hem, huong: huong, media: JSON.stringify(media), money: money,number_roomNgu: number_roomNgu, number_roomTam: number_roomTam, 
                number_tang: number_tang, price: price, rong: rong, title: title, type: type, type_bds: type_bds
            }).then(reponse => {
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
  