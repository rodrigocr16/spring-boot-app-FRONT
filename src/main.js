import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

axios.interceptors.request.use(config => {
  if(store.state.token) {
  config.headers.Authorization = store.state.token
  }
  return config
 })
 axios.interceptors.response.use(res => {
  return res
  }, error => {
  switch(error.response.status) {
    case 401:{
      store.commit('logout');
      router.push('/login');
    } break;
    case 403:{
      alert('Não autorizado');
      router.push('/');
    } break;
    case 404: alert('Não encontrado');
      break;
    case 400: alert('Bad request');
      break;
  } throw error
 })

axios.defaults.baseURL = 'https://8081-apricot-woodpecker-hiaw1el5.ws-us09.gitpod.io'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
