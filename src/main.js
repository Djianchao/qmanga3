import Vue from 'vue'
import App from './App.vue'
import "./layout/flexible"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
