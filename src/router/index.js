import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(!store.state.logado) {
        router.push('/Login');
      } else {
        next()
      }
      
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  /*
  {
    path: '/alo/:nome',
    name: 'alo',
    component: Alo,
    props: true,
    beforeEnter: (to, from, next) => {
      if (from.name !== 'About') {
        next()
      } else {
        next(false)
      }
    }
  },
  */

  {
    path: '/About',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.logado == store.state.logado) {
    next()
  } else {
    next(false)
  }
})

export default router
