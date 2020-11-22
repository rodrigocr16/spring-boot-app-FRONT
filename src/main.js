import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'https://8080-a90a80b8-b35e-449b-a00a-b1ecb4556de5.ws-us02.gitpod.io/'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
