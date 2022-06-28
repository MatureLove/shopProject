//引入路由组件
export default [
    {
        name: 'center',
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: {
            isShow: true
        },
        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/Center/MyOrder'),
            },
            {
                path: 'grouporder',
                component: () => import('@/pages/Center/GroupOrder'),
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            isShow: true
        },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path === '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: {
            isShow: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'trade',
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: {
            isShow: true
        },
        beforeEnter: (to, from, next) => {
            if (from.path === '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: {
            isShow: true //当为true的时候footer组件显示
        }
    },
    {
        name: 'addCartSuccess',
        path: '/addCartSuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: {
            isShow: true //当为true的时候footer组件显示
        }
    },
    {
        path: '/detail/:skuid',
        name: 'detail',
        component: () => import('@/pages/Detail'),
        //配置路由元信息
        meta: {
            isShow: true //当为true的时候footer组件显示
        }
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/Home'),
        //配置路由元信息
        meta: {
            isShow: true //当为true的时候footer组件显示
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/Login'),
        meta: {
            isShow: false //当为false的时候footer组件隐藏
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/pages/Register'),
        meta: {
            isShow: false
        }
    },
    {
        path: '/search/:keyword?',
        name: 'search',
        component: () => import('@/pages/Search'),
        meta: {
            isShow: true
        }
    },
    //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: '*',
        redirect: "/home"
    }
]