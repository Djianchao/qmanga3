const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    lintOnSave: false,

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
    }
})
