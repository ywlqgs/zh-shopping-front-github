const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 不配置publicPath时，默认为'/'，并且项目必须要放在根目录下才能打开或运行
  // 配置后，打包后的项目在任意目录都能打开或运行
  publicPath: './',
  transpileDependencies: true
})
