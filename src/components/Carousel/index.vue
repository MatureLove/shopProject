<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            //设置轮播图防线
            direction: "horizontal",
            loop: true, // 循环模式选项
            //自动循环
            autoplay: {
              delay: 2000,
              stopOnLastSlide: false,
              disableOnInteraction: false,
            },
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
              //分页器类型
              type: "bullets",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            //   // 切换效果
            //   effect: "cube",
          });
          //1:swiper插件,对外暴露一个Swiper构造函数
          //2:Swiper构造函数需要传递参数 1、结构总根节点CSS选择器|根节点真实DOM节点  2、轮播图配置项
          //鼠标进入停止轮播
          mySwiper.el.onmouseover = function () {
            mySwiper.autoplay.stop();
          };
          //鼠标离开开始轮播
          mySwiper.el.onmouseout = function () {
            mySwiper.autoplay.start();
          };
        });
      },
    },
  },
};
</script>

<style>
</style>
