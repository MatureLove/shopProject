//引入
import { reqDetailInfo, reqAddShopCart } from "@/api"
//引入封装的生成uuid的模块
import { getUUID } from '@/utils/uuid_token'
export default {
    //开启命名空间
    namespaced: true,
    actions: {
        //获取商品详情信息
        async getDetailInfo({ commit }, skuid) {
            let result = await reqDetailInfo(skuid)
            // console.log(result)
            commit('GETDETAILINFO', result.data)
        },
        //加入购物车
        //因为async函数返回值是一个promise，而reqAddShopCart是通过axios.create创建出来的返回值也是一个promise对象
        //所以async返回值是成功还是失败取决于reqAddShopCart是成功还是失败
        //返回值的结果也就传到了 this.$store.dispatch调用哪里
        async addShopCart({ commit }, { skuId, skuNum }) {
            //发请求，然后台将数据存到数据库中
            //因为这里只是告诉服务器，将数据存到数据库中，返回的只是成功还是失败
            //返回code等于200表示成功
            //在这里不需要commit，因为他没有返回其余的数据
            //第一种方法
            // let result = await reqAddShopCart(skuId, skuNum)
            // if (result.code == 200) {  //code为200表示发送请求成功，任何非空字符串都表示一个成功promise对象，成功的值就是返回的值
            // return 'ok'
            // } else {
            // return Promise.reject('false')  //否则返回一个失败的promise对象
            // }

            //第二种方法
            return reqAddShopCart(skuId, skuNum)

        }
    },
    mutations: {
        GETDETAILINFO(state, detailInfo) {
            state.detailInfo = detailInfo
        }
    },
    state: {
        detailInfo: {},
        uuid_token: getUUID() //生成一个uuid
    },
    getters: {
        //如果后面不跟一个空对象，因为detailInfo初始数据是一个空对象，空对面没有categoryView这个属性就是underfind，underfind传到组件中
        //在点属性的话就会报错，虽然不影响运行结果，但是会有一个警告，如果跟上一个空对象，在请求数据没回来之前，会将空对象传给组件，空
        //对象点属性是underfind不会报错
        categoryView(state) {
            return state.detailInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.detailInfo.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.detailInfo.spuSaleAttrList || []
        }
    }
}