// 自动注册公共组件
export default function regist(Vue) {
    const componentsContext = require.context('./', false, /.vue$/)
    componentsContext.keys().forEach(file_name => {
    // 获取文件中的 default 模块
        const componentConfig = componentsContext(file_name).default
        console.log(file_name)
        if (/.vue$/.test(file_name)) {
            Vue.component(componentConfig.name, componentConfig)
        }
    })

}
