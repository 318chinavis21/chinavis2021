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
    disableHostCheck: true
  }
}
