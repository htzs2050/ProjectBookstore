import Vue from 'vue'
import App from './App.vue'
import router from './router'
import jsCookie from 'js-cookie'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
