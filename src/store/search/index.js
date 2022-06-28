import { reqGetSearchInfo } from '@/api'

//search的vuex
export default {
    namespaced: true,
    //准备actions对象一一响应组件中用户的动作
    actions: {
        //获取search的数据
        async getSearchList({ commit }, data = {}) {
            let result = await reqGetSearchInfo(data)
            if (result.code === 200) {
                commit('GETSEARCHLIST', result.data)
            }
        }
    },
    //准备mutations对象，修改state中的数据
    mutations: {
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList
        }
    },
    //准备state对象，保存具体的数据
    state: {
        searchList: {}
    },
    //计算属性
    //项目当中的getters主要作用是：简化仓库中的数据（为简化数据而生）
    getters: {
        goodsList(state) {
            return state.searchList.goodsList || []
        },
        attrsList(state) {
            return state.searchList.attrsList
        },
        trademarkList(state) {
            return state.searchList.trademarkList
        },
        total(state) {
            return state.searchList.total
        }
    }
}