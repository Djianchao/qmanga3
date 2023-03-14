import settings from '@/setting'

const state = {
    ...settings
}

const mutations = {
    setMode(state, width) {
        if (width <= 980) {
            state.mode = 'mobile'
        } else {
            state.mode = 'pc'
        }

        console.log(state.mode);
    }
}

export default {
    namespaced: true,
    state,
    mutations
}