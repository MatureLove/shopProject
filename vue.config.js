const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,/*关闭语法检查*/
  devServer: {
    host: '127.0.0.1',
    // https:true,
    port: 8080,
    client: {
      webSocketURL: 'ws://127.0.0.1:8080/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    //代理跨域
    proxy: {
      '/api': {
        target: ' http://gmall-h5-api.atguigu.cn',
        changeOrigin: true,//用于控制请求头中的host值
        // pathRewrite: { '^/api': '' },
        // ws: true, //用于支持websocket
      },
    },
  },
  //处理map文件
  productionSourceMap: false
})
