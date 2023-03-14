import Vue from 'vue'
import regist from './autoRegister'
import Loading from './Loading'

const loadingCst = Vue.extend(Loading)
const loadingInstance = new loadingCst()
loadingInstance.$mount()

Vue.directive('loading', {
    inserted: (el, binding) => {
    // 如果是遮住全屏的loading
        const isFullscreen = binding.modifiers.fullScreen || binding.value.fullScreen
        if (isFullscreen) {
            loadingInstance.$set(loadingInstance, 'fullScreen', true)
        } else {
            el.style.position = 'relative'
        }
        loadingInstance.$set(loadingInstance, 'loading', binding.value)
        el.appendChild(loadingInstance.$el)
    },
    componentUpdated: (el, binding) => {
    // 如果加载完毕，则隐藏loading组件
        const isFullscreen = binding.modifiers.fullScreen || binding.value.fullScreen
        if (!binding.value.loading) {
            el.style.position = ''
            loadingInstance.$set(loadingInstance, 'fullScreen', false)
            loadingInstance.$set(loadingInstance, 'loading', false)
        } else {
            // 重新显示loading
            if (isFullscreen) {
                loadingInstance.$set(loadingInstance, 'fullScreen', true)
            }
            loadingInstance.$set(loadingInstance, 'loading', true)
        }
    }
})

regist(Vue)