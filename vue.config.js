module.exports = {
  publicPath: "./",
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    performance: {
      hints: false
    },
  },
  devServer: {

    open: true,
    host: '127.0.0.1', //修改这里
    port: '5000', //修改这里
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000/', //修改这里
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api': ''
        }
      }
    }

  }
}
