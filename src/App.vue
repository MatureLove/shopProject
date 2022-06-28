<template>
  <div class="outer">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  //当组件挂在完毕，通知vuex发送请求拿数据,存储与仓库state当中
  //放在这里只会向服务器请求一次数据，放到自己的组件上每次页面重新挂载就会重新请求数据
  mounted() {
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style></style>
