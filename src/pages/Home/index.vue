<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav></TypeNav>
    <!-- ListContainer组件 -->
    <ListContainer></ListContainer>
    <!-- TodayRecommend组件 -->
    <TodayRecommend></TodayRecommend>
    <!-- Rank组件 -->
    <Rank></Rank>
    <!-- Like组件 -->
    <Like></Like>
    <!-- Floor组件 -->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :floor="floor"></Floor>
    <!-- Brand组件 -->
    <Brand></Brand>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

export default {
  name: "Home",
  components: { ListContainer, TodayRecommend, Rank, Like, Floor, Brand },
  mounted() {
    this.$store.dispatch("home/getFloorList");
    //获取用户信息
    this.$store.dispatch('user/getLoginInfo')
  },
  computed: {
    ...mapState("home", { floorList: "floorList" }),
  },
};
</script>

<style>
</style>
