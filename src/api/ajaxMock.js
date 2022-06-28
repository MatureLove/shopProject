/* 
专门请求mock接口的axios封装
*/
//对于axios进行二次封装
import axios from 'axios'
//引入nprogress
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//利用axios对象的方法creat，去创建一个axios实例
const mockAjax = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径中会自动带上api
    baseURL: '/mock',
    //请求超时的时间
    timeout: 5000
})
//请求拦截器，再发送请求之前，请求拦截器可以检测到，在请求发出去之前，做一些事情
mockAjax.interceptors.request.use(function (config) {
    //config请求配置对象，里面有一个属性很重要，header属性
    //进度条启动
    nprogress.start()
    return config
})
//响应拦截器
mockAjax.interceptors.response.use((response) => {
    //成功的回调函数，服务器响应回来数据后，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done()
    return response.data
}, (error) => {
    //失败的回调函数
    return Promise.reject(error)
})




//对外暴露
export default mockAjax 