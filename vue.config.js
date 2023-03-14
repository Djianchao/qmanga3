const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
    publicPath: '',
    lintOnSave: false,
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    chainWebpack: config => {
        // 引入全局less样式
        const oneOfsMap = config.module.rule('less').oneOfs.store
        oneOfsMap.forEach(item => {
            item
                .use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: ['./src/assets/styles/resources/*.less']
                })
                .end()
        })
        // svg 相关配置
        config.module
            .rule('svg')
            .exclude.add(path.join(__dirname, 'src/assets/svg'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(path.join(__dirname, 'src/assets/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
        config
            .plugin('html')
            .tap(args => {
                args[0].template = path.join(__dirname, 'src/index.html')
                return args
            })
    }
})
