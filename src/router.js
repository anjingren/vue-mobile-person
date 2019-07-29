import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home'
// import Login from '@/views/Login'
// import TabBar from '@/views/tabbar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () =>
          import('@/views/tabbar/index.vue'),
      children: [{
        path: '/',
        name: 'home',
        component: () =>
              import('@/views/Home')
      }]
    },
    { name: 'login',
      path: '/login',
      component: () => {
      import('@/views/Login')
      } }
  ]
})
