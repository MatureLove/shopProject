//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
import store from '@/store'
//使用插件
Vue.use(VueRouter)

//重写push和replace方法
//先将VueRouter原型上的push和replace方法备份一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写
//第一个参数，告诉原来push方法你要往哪里跳转（传递那些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
//call和apply的区别
//相同点：都可以调用函数一次，都可以改变函数的this
//不同点：传递多个参数时，call传递参数用逗号隔开，apply传递一个数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}




//配置路由
const router = new VueRouter({
    //配置路由
    routes,
    //滚轮滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
//配置路由守卫
//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach(async (to, from, next) => {
    //to:可以获取到你要跳转到的那个路由的信息
    //from:可以获取到你从那个路由来的信息
    //next：放行 next() / next('/')
    // console.log(store)
    //获取token，通过token判断用户是否登录
    let token = store.state.user.token
    //获取用户信息下的name属性，通过这个来判断是否获取到用户信息
    let name = store.state.user.userinfo.name
    // console.log(to)
    if (token) {
        //如果用户已登录，还要跳转登录页，是禁止的，直接跳转到首页
        if (to.path === '/login') {
            next('/home')
        } else {
            //在跳转到其他页面之前判断是否获取到用户信息
            if (name) {
                next()
            } else {
                try {
                    //没有用户信息，派发action请求用户信息
                    await store.dispatch('user/getLoginInfo')
                    next()
                } catch (error) {
                    //token过期需要，清理掉本地token，返回登陆页重新登陆，重新获取token
                    await store.dispatch('user/outLogin')
                    next('/login')
                }
            }
        }
    } else {
        //获取未登录时要去的路径
        let topath = to.path
        if (topath.indexOf('/trade') !== -1 || topath.indexOf('/pay') !== -1 || topath.indexOf('/center') !== -1) {
            //把未登录时想去而没有去成的信息存储到地址栏中
            next('/login?redirect=' + topath)
        } else {
            //去的不是上面的路径都放行
            next()
        }
    }

})
//导出路由
export default router