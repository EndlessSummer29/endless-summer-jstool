'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 8899 // dev port


module.exports = {
    publicPath: '/',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    lintOnSave:false,
    configureWebpack(config) {
        config.externals = {
            'AMap': 'AMap', // 高德地图配置
            // 'Loca': 'Loca', 
        }
    },
    devServer : {
      port: port,
      open: true,
      hot:true,//热更新
      overlay: {
        warnings: false,
        errors: true
      },
      watchOptions: {//热更新屏蔽文件
        // ignored: /public/,
        ignored: ['**/files/**/*.js', '**/node_modules','**/public']
      },
      before: require('./mock/mock-server.js')
    },
    // publicPath: process.env.NODE_ENV === 'production'
    // ? './' // 打包后发布文件名
    // : '/' // 开发环境相对路径
    // // baseUrl: process.env.NODE_ENV=='production'?'./':'/'
    
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    // config.module.rule('svgIcon').test(/\.svg$/).include.add(resolve('src/icons')).end().use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .tap(options => {
    //     options = {
    //       symbolId: 'icon-[name]'
    //     }
    //     return options
    //   })
    config.module.rule('svgIcon').test(/\.svg$/).include.add(resolve('src/icons')).end().use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
        options = {
          symbolId: 'icon-[name]'
        }
        return options
      })
    config.module
    .rule('svg')
    .exclude
    .add(resolve('src/icons'))
    .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
      
      
      // set worker-loader
      config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .end();
      // 解决：worker 热更新问题
      config.module.rule('js').exclude.add(/\.worker\.js$/);












      // glslloader
      config.module
      .rule('glslify-import-loader')
      .test(/\.(glsl|frag|vert|fs|vs)$/)
      .exclude.add(resolve('packages/utils/threejs/demo/butterfly/'))
      .end()
      .use('glslify-import-loader')
      .loader('glslify-import-loader')
      .end();
      config.module
      .rule('glslify-loader')
      .test(/\.(glsl|vs|fs|vert|frag)$/)
      .exclude.add(resolve('packages/utils/threejs/demo/butterfly/'))
      .end()
      .use('glslify-loader')
      .loader('glslify-loader')
      .end();
      config.module
      .rule('raw-loader')
      .test(/\.txt$/i)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  }
}