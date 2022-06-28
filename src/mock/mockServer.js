/* 
利用mockjs来mock数据接口
*/
//引入mockjs
import Mock from "mockjs";
//引入定义的数据
import banners from './banners.json'
import floors from './floors.json'
// 提供广告位轮播数据的接口
//mock数据:第一个参数是请求的地址，第二个参数是请求数据
Mock.mock('/mock/banners', {
    code: 200,
    data: banners
})
// 提供所有楼层数据的接口
Mock.mock('/mock/floors', {
    code: 200,
    data: floors
})