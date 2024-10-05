const { defineConfig } = require('@vue/cli-service')

// ? A-SIERRA PUBLIC PATH PROD publicPath: '/recipe_book/' - PUBLIC PATH LOCAL publicPath: '/'
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: '/recipe_book/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
