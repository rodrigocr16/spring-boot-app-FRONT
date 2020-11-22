import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'https://8080-fcd54f4e-8f99-4829-a529-524bc3e281e9.ws-us02.gitpod.io'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
