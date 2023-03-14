import settings from '@/setting'

const state = {
    ...settings
}

const mutations = {
    setMode(state, width) {
        if (width <= 768) {
            state.mode = 'mobile'
        } else {
            state.mode = 'pc'
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations
}