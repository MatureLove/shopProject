import Vue from 'vue'
import App from './App.vue'
//引入路由配置文件
import router from '@/router'
//引入store
import store from '@/store'
//引入TypeNav组件
import TypeNav from '@/components/TypeNav'
//引入Carousel
import Carousel from '@/components/Carousel'
//引入 Pagination
import Pagination from '@/components/Pagination'
//引入mockjs
import '@/mock/mockServer'
//引入swiper
import 'swiper/css/swiper.css'
//引入api
import * as API from '@/api'
//按需引入，elementUi
import { MessageBox } from 'element-ui';
//引入图片
import xd from '@/assets/1.gif'
//图片懒加载
import VueLazyload from 'vue-lazyload'
//表单验证
import '@/plugins/validate'
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: xd,
})

//引入elementUi样式
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//注册为全局使用
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  render: h => h(App),
  //注册路由。
  router: router,
  //注册store
  store,
  //创建全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
})
