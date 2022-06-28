//当前这个模块，api进行统一管理
import requests from "./request";
//引入mock的axios封装
import mockAjax from './ajaxMock'

//三级联动接口
///api/product/getBaseCategoryList   get  无参数
//发请求：axios发请求返回结果promise对象
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
})
//轮播图接口
export const reqGetBannerList = () => mockAjax({
    url: '/banners',
    method: 'get'
})

//floor接口
export const reqFloorList = () => mockAjax({
    url: '/floors',
    method: 'get'
})
//获取搜索模块数据
//当前这个接口获取搜索模块的数据，给服务器传递一个参数至少是一个空对象
export const reqGetSearchInfo = (data) => requests({
    url: '/list',
    method: 'post',
    data: data
})

//获取商品详情信息   /api/item/{ skuId }
export const reqDetailInfo = (skuid) => requests({
    url: `/item/${skuid}`,
    method: 'get'
})

//加入购物车 /api/cart/addToCart/{ skuId }/{ skuNum }  post
export const reqAddShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

//获取购物车数据 /api/cart/cartList  GET
export const reqGetShopCart = () => requests({
    url: '/cart/cartList',
    method: 'get'
})
//删除购物车数据 /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteShopCart = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})
//修改选中状态/api/cart/checkCart/{skuID}/{isChecked} GET
export const reqIsCheckedCart = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

//获取验证码 /api/user/passport/sendCode/{phone} get
export const reqGetPhoneCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})
//用户注册 /api/user/passport/register post
export const reqUserRegister = (data) => requests({
    url: `/user/passport/register`,
    method: 'post',
    data
})

//用户登录 /api/user/passport/login  post
export const reqUserLogin = (data) => requests({
    url: '/user/passport/login',
    method: 'post',
    data
})

//登录之后，获取用户信息 /user/passport/auth/getUserInfo get
export const reqGetLoginInfo = () => requests({
    url: `/user/passport/auth/getUserInfo`,
    methpd: 'get'
})

//退出登录 /api/user/passport/logout get
export const reqOutLogin = () => requests({
    url: '/user/passport/logout',
    method: 'get'
})
//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqGetUserInfo = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})
//10.获取订单交易页信息 /api/order/auth/trade get
export const reqGetOrderInfo = () => requests({
    url: '/order/auth/trade',
    method: 'get'
})

//提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data
})
//获取订单支付信息 url /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    methpd: 'get'
})
//获取订单支付状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})
//11.获取我的订单列表 /api/order/auth/{page}/{limit} get
export const reqOrderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})