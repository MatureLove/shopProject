<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cartInfo, index) in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked"
              @change="isCheckedCart(cartInfo, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('minus', -1, cartInfo)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cartInfo.skuNum"
              @change="handler('change', $event.target.value * 1, cartInfo)">
            <a class="plus" @click="handler('add', 1, cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteShopCart(cartInfo)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length > 0"
          @change="updateAllShopCart">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="cleckChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
//按需引入lodash
import throttle from "lodash/throttle";
export default {
  name: 'ShopCart',
  mounted() {
    this.getDate()
  },
  methods: {
    //封装一个发请求获取数据的方法
    getDate() {
      this.$store.dispatch('shopcart/getShopCart')
    },
    //修改购物车数量的方法
    handler: throttle(async function (type, disNum, cartInfo) {
      //进行判断是点的+还是-还是自己输入的
      switch (type) {
        case 'add':
          disNum = 1
          break
        case 'minus':
          //判断当前数据是否大于1，如果大于1就传-1，否则就传0
          disNum = cartInfo.skuNum > 1 ? -1 : 0
          break
        case 'change':
          //判断用户输入的是否是合法数值
          if (isNaN(disNum) || disNum < 1) {
            disNum = disNum
          } else {
            //如果是合法数值，为防止用户输入小数，将数值取整减去原先的数量就是要传的数量
            disNum = parseInt(disNum) - cartInfo.skuNum
          }
          break
      }
      //整理好数据，重新发送请求
      try {
        //发送请求，修改购物车数据
        await this.$store.dispatch('detail/addShopCart', {
          skuId: cartInfo.skuId,
          skuNum: disNum
        })
        //发送完请求在重新获取数据
        this.getDate()
      } catch (error) {
        alert(error.message)
      }
    }, 500),
    //删除购物车商品的方法
    async deleteShopCart(cartInfo) {
      try {
        await this.$store.dispatch('shopcart/deleteShopCart', cartInfo.skuId)
        //请求成功的话重新获取数据
        this.getDate()
      } catch (error) {
        console.log(error.message)
      }
    },
    //修改商品选中状态
    async isCheckedCart(cartInfo, event) {
      try {
        //判断是选中还是没选
        let isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('shopcart/isCheckedCart', {
          skuId: cartInfo.skuId,
          isChecked
        })
        //如果修改成功在重新获取数据
        this.getDate()
      } catch (error) {
        console.log(error.message)
      }
    },
    //清除所有已选中
    async cleckChecked() {
      try {
        await this.$store.dispatch('shopcart/clearShopCartChecked')
        //请求成功之后再次获取数据
        this.getDate()
      } catch (error) {
        console.log(error.message)
      }
    },
    //全选
    async updateAllShopCart(event) {
      //拿到改变的值
      let isChecked = event.target.checked ? '1' : '0'
      try {
        await this.$store.dispatch('shopcart/updateAllShopCart', isChecked)
        //请求成功之后再拿数据
        this.getDate()
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  computed: {
    ...mapGetters('shopcart', ['cartInfo']),
    //购物车数据
    cartInfoList() {
      return this.cartInfo.cartInfoList || []
    },
    //计算产品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach(item => {
        sum += item.skuPrice * item.skuNum
      });
      return sum
    },
    //全选
    isAllChecked() {
      return this.cartInfoList.every(item => item.isChecked == 1)
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }



        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>