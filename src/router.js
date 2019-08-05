import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Home'
// import Login from '@/views/Login'
// import TabBar from '@/views/tabbar'

Vue.use(Router)

export default new Router({
  // routes: [{
  //   path: '/login',
  //   name: 'login',
  //   component: () => {
  //   import('@/views/Login')
  //   }
  // },
  // { path: '/',
  //   component: () =>
  //         import('@/views/tabbar/index.vue'),
  //   children: [{
  //     path: '/',
  //     name: 'home',
  //     component: () =>
  //             import('@/views/Home')
  //   }]
  // }
  // ]

  routes: [{
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
  {
    path: '/login',
    name: 'login',
    component: () =>
        import('@/views/Login')
  }]

})
