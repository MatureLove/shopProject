<template>
  <div>
    <TypeNav></TypeNav>
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">x</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">x</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">x</i>
            </li>
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{ attrValue.split(":")[1]
              }}<i @click="removeAttrValue(index)">x</i>
            </li>
          </ul>
        </div>
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"></SearchSelector>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>综合
                    <span v-show="isOne" class="iconfont" :class="{
                      'icon-direction-up': isUp,
                      'icon-direction-down': isDown,
                    }"></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>价格
                    <i v-show="isTwo" class="iconfont" :class="{
                      'icon-direction-up': isUp,
                      'icon-direction-down': isDown,
                    }"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="{ name: 'detail', params: { skuid: good.id } }"><img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5"
            @getPageNo="getPageNo" @getPageSize="getPageSize" />
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector";
export default {
  name: "Search",
  components: { SearchSelector },
  data() {
    return {
      searchParams: {
        //一级分类的id
        category1Id: "",
        //二级分类的id
        category2Id: "",
        //三级分类的id
        category3Id: "",
        //分类名字
        categoryName: "",
        //关键字
        keyword: "",
        //排序
        order: "1:desc",
        //分页器用的：代表当前是第几页
        pageNo: 1,
        //代表一页展示多少条数据
        pageSize: 10,
        //平台售卖属性带的参数
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  //在组件挂载之前，修改参数
  beforeMount() {
    //合并对象，从第二个对象开始全部合并到第一个对象中
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  //组件挂载完毕，调用封装好的放法进行请求
  mounted() {
    this.getData();
  },
  //拿到仓库中的数据
  computed: {
    ...mapGetters("search", ["goodsList", "total"]),

    //判断是否添加类名active
    isOne() {
      return this.searchParams.order.indexOf("1") !== -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") !== -1;
    },
    //升序
    isUp() {
      return this.searchParams.order.indexOf("asc") !== -1;
    },
    //降序
    isDown() {
      return this.searchParams.order.indexOf("desc") !== -1;
    },
  },
  //封装一个发请求的方法
  methods: {
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    //删除分类的名字
    removeCategoryName() {
      //删除名字之前，我们需要把参数全部清空，回到默认的样子，在向服务器发送请求
      //因为带的参数都是可有可无的，所以我们设置为underfined就不会携带这个参数
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;
      this.getData();
      //因为我们当前清的只是query参数
      //所以我们要判断有没有params参数，有的话需要携带
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //删除面包屑关键字
    removeKeyword() {
      //先将keyword清空
      this.searchParams.keyword = undefined;
      //在重新发送请求
      this.getData();
      //调用全局事件总线将输入框中的内容清除
      this.$bus.$emit("clear");
      //跳转路由
      //判断当前路由是否有query参数
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
    },
    //自定义事件，拿到品牌信息
    trademarkInfo(trad) {
      this.searchParams.trademark = `${trad.tmId}:${trad.tmName}`;
      this.getData();
    },
    //删除品牌信息
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //收集平台属性
    attrInfo(attr, attrList) {
      // console.log(attr, attrList);
      //整理参数格式
      let props = `${attr.attrId}:${attrList}:${attr.attrName}`;
      //数组去重，判断数组中是否有相同的
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      //z再次发送请求
      this.getData();
    },
    //删除平台属性
    removeAttrValue(index) {
      // console.log(index);
      //根据拿到的索引值进行删除
      this.searchParams.props.splice(index, 1);
      //发送请求
      this.getData();
    },
    //修改排序
    changeOrder(flag) {
      //flag代表用户点击的是综合还是价格：综合：1，价格：2
      let originOrder = this.searchParams.order;
      //获取最开始的状态
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      //准备一个新的order属性值
      let newOrder = "";
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:"desc"`;
      }
      // console.log(newOrder);
      //将新值赋值
      this.searchParams.order = newOrder;
      //再次发送请求
      this.getData();
    },
    //修改页码
    getPageNo(page) {
      this.searchParams.pageNo = page;
      this.getData();
    },
    //修改每页展示的条数
    getPageSize(size) {
      this.searchParams.pageSize = size;
      this.getData();
    },
  },
  //数据监听，监听组件实例身上的属性的属性值变化
  watch: {
    //通过监视当前路由的变化，来再次请求数据
    $route(newValue, oldValue) {
      //将新的参数合并到当前携带的参数中
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //调用方法发请求
      this.getData();
      //因为有可能存在携带不同的1，2，3级分类id，所以在每次请求之后将当前的id清空，下次在携带新的id
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }

    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;

      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }

      .hot-list {
        padding: 15px;

        ul {
          display: flex;

          li {
            width: 25%;
            height: 100%;

            .list-wrap {

              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }

              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }

              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }

              .price {
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
