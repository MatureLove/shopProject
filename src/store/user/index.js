import { reqGetPhoneCode, reqUserRegister, reqUserLogin, reqGetLoginInfo, reqOutLogin } from "@/api";
import { getToken, setToken, removeToken } from "@/utils/token";
export default {
    //开启命名空间
    namespaced: true,
    actions: {
        //获取验证码
        async getPhoneCode({ commit }, phone) {
            let result = await reqGetPhoneCode(phone)
            if (result.code === 200) {
                commit('GETPHONECODE', result.data)
                return 'ok'
            } else {
                return Promise.reject(error)
            }
        },
        //用户注册
        async userRegister({ commit }, user) {
            let result = await reqUserRegister(user)
            if (result.code === 200) {
                return 'ok'
            } else {
                return Promise.reject('error')
            }
        },
        //用户登录
        async userLogin({ commit }, data) {
            let result = await reqUserLogin(data)
            if (result.code === 200) {
                commit('USERLOGIN', result.data.token)
                //普通本地存储的方法
                // localStorage.setItem('TOKEN', result.data.token)
                //运用封装的token文件进行设置
                setToken(result.data.token)
                return 'ok'
            } else {
                return Promise.reject('error')
            }
        },
        //获取用户信息
        async getLoginInfo({ commit }) {
            let result = await reqGetLoginInfo()
            if (result.code === 200) {
                commit('GETUSERINFO', result.data)
                return 'ok'
            } else {
                return Promise.reject('error')
            }
        },
        //退出登录
        async outLogin({ commit }) {
            let result = await reqOutLogin()
            if (result.code === 200) {
                commit('OUTLOGIN')
                return 'OK'
            } else {
                return Promise.reject('error')
            }
        }
    },
    mutations: {
        GETPHONECODE(state, phonecode) {
            state.phonecode = phonecode
        },
        USERLOGIN(state, token) {
            state.token = token
        },
        GETUSERINFO(state, userinfo) {
            state.userinfo = userinfo
        },
        OUTLOGIN(state) {
            state.token = ''
            state.userinfo = {}
            removeToken()
        }
    },
    state: {
        phonecode: '',
        // token: localStorage.getItem('TOKEN'),
        token: getToken(),//运用封装的token文件进行获取
        userinfo: {}
    },
    getters: {

    }
}