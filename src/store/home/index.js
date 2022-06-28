//导入封装的axios
import { reqCategoryList, reqFloorList, reqGetBannerList } from '@/api'
//home的vuex
export default {
    namespaced: true,
    //准备actions对象一一响应组件中用户的动作
    actions: {
        //通过api里面的接口函数调用，向服务器发送请求，获取服务器的数据
        async categoryList({ commit }) {
            let result = await reqCategoryList()
            // console.log(result)
            commit('CATEGORYLIST', result.data)
        },
        //通过api里面的接口函数调用，向服务器发送请求，获取banner的数据
        async getBannerList({ commit }) {
            let result = await reqGetBannerList()
            // console.log(result)
            if (result.code === 200) {
                commit('GETBANNERLIST', result.data)
            }
        },
        //获取floor的数据
        async getFloorList({ commit }) {
            let result = await reqFloorList()
            if (result.code === 200) {
                commit('GETFLOORLIST', result.data)
            }
        }
    },
    //准备mutations对象，修改state中的数据
    mutations: {
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList
        },
        GETBANNERLIST(state, bannerList) {
            state.bannerList = bannerList
        },
        GETFLOORLIST(state, floorList) {
            state.floorList = floorList
        }
    },
    //准备state对象，保存具体的数据
    state: {
        categoryList: [],//三级联动数据
        bannerList: [],//轮播图数据
        floorList: []//floor数据
    },
    getters: {

    }
}