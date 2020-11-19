import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'https://8080-baf7f6ab-5e4f-4041-b1f0-828eb1ba3037.ws-us02.gitpod.io'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
