//引入请求api
import { reqGetShopCart, reqDeleteShopCart, reqIsCheckedCart } from '@/api'
export default {
    //开启命名空间
    namespaced: true,
    actions: {
        //发送请求获取购物车数据
        async getShopCart({ commit }) {
            let result = await reqGetShopCart()
            // console.log(result)
            commit('GETSHOPCART', result.data)
        },
        //发送请求删除购物车数据
        async deleteShopCart({ commit }, skuId) {
            return reqDeleteShopCart(skuId)
        },
        //修改购物车选中状态
        async isCheckedCart({ commit }, { skuId, isChecked }) {
            return reqIsCheckedCart(skuId, isChecked)
        },
        //清除所有已选中
        async clearShopCartChecked({ dispatch, getters }) {
            //声明一个数组用来接受需要删除的数据
            let promiseAll = []
            //遍历数组中的数据将ischecked为1的调用dispach删除然后将返回的promise对象收到，然后添加到前面准备好的数组中
            getters.cartInfoList.forEach(item => {
                let promise = item.isChecked == 1 ? dispatch('deleteShopCart', item.skuId) : ''
                promiseAll.push(promise)
            });
            //运用Promise.all方法传入一个数组，当只有都成功是返回成功的promise对象
            return Promise.all(promiseAll)
        },
        //修改全选状态
        async updateAllShopCart({ dispatch, getters }, isChecked) {
            //定义一个数组
            let promiseAll = []
            getters.cartInfoList.forEach(item => {
                let promise = dispatch('isCheckedCart', {
                    skuId: item.skuId,
                    isChecked
                })
                //将返回的promise结果添加到数组中
                promiseAll.push(promise)
            })
            //将这个数组放到Promise.all方法中返回
            return Promise.all(promiseAll)
        }
    },
    mutations: {
        GETSHOPCART(state, shopcartlist) {
            state.shopcartlist = shopcartlist
        }
    },
    state: {
        shopcartlist: []
    },
    getters: {
        cartInfo(state) {
            return state.shopcartlist[0] || {}
        },
        cartInfoList(state) {
            return state.shopcartlist[0].cartInfoList || []
        }
    }
}