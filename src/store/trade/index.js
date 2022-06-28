import { reqGetUserInfo, reqGetOrderInfo } from '@/api'
export default {
    //开启命名空间
    namespaced: true,
    actions: {
        //获取用户地址信息
        async getUserInfo({ commit }) {
            let result = await reqGetUserInfo()
            if (result.code === 200) {
                commit('GETUSERINFO', result.data)
            }
        },
        //获取订单交易页信息
        async getOrderInfo({ commit }) {
            let result = await reqGetOrderInfo()
            if (result.code === 200) {
                commit('GETORDERINFO', result.data)
            }
        }
    },
    mutations: {
        GETUSERINFO(state, address) {
            state.address = address
        },
        GETORDERINFO(state, orderinfo) {
            state.orderinfo = orderinfo
        }
    },
    state: {
        address: [],
        orderinfo: {}
    },
    getters: {

    }
}