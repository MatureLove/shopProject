<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="outChangeIndex" @mouseenter="showEnter">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{ cur: currentIndex === index }">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryname="c1.categoryName" :data-category1id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix" :style="{
                  display: currentIndex === index ? 'block' : 'none',
                }">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryname="c2.categoryName" :data-category2id="c2.categoryId">{{ c2.categoryName
                        }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryname="c3.categoryName" :data-category3id="c3.categoryId">{{ c3.categoryName
                          }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//引入mapStateAPI
import { mapState } from "vuex";
//按需引入lodash
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1, //通过这个值判断是否跟当前下标值相等来加类名
      show: true, //通过这个判断列表是否隐藏
    };
  },
  methods: {
    //鼠标进入修改currentIndex的值
    //throttle里面的回调函数最好不要用箭头函数，有可能会引起this指向问题
    changeIndex: throttle(function (index) {
      //将移入的下标值赋值给currentIndex
      this.currentIndex = index;
    }, 50),
    //鼠标移出修改currentIndex的值
    outChangeIndex() {
      this.currentIndex = -1;
      //鼠标移除隐藏列表
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    //跳转方式：编程式导航+事件委托
    goSearch(event) {
      //通过事件委托，获取触发节点
      let element = event.target;
      //通过dataset获取节点中的自定义属性和属性值
      let { categoryname, category3id, category1id, category2id } =
        element.dataset;
      //如果标签身上有categoryname属性一定是a标签
      if (categoryname) {
        //获取跳转路由的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //整理完整参数
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          //路由跳转
          this.$router.push(location);
        }
      }
    },
    //在search组件时，鼠标进入让列表显示
    showEnter() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
  },

  mounted() {
    //通过路径信息判断是否显示列表
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState("home", {
      //右侧需要一个函数，当使用这个计算属性的时候，右边的函数会执行一次，注入一个参数state，state就是当前仓库中的数据
      categoryList: "categoryList",
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 512px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 512px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        .cur {
          background-color: pink;
        }
      }
    }

    .sort-enter,
    .sort-leave-to {
      height: 0;
    }

    .sort-enter-to,
    .sort-leave {
      height: 512px;
    }

    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
