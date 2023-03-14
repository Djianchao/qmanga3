import Vue from 'vue'
import App from './App.vue'
import "./layout/flexible"
import router from './router/index'
import store from './store/index'

import '@/assets/styles/reset.less'
import '@/components/common/index'

import './mixinMethods'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
