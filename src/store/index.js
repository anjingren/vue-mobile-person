import Vue from 'vue'
import Vuex from 'vuex'
// import { setItem, getItem, removeItem } from '@/utils/auth.js'
import * as auth from '@/utils/auth.js'
// 注册使用
Vue.use(Vuex)
// 配置Vuex
const store = new Vuex.Store({
  // state声明数据
  state: {
    // 初始化，在本地获取token，所以就调用getItem
    user: auth.getItem()
  },

  actions: {},
  // 接收改变的数据，然后去更新state
  mutations: {
    setUser (state, data) {
      // 接收改变的数据，更新state
      state.user = data
      // 把state中获取到的token设置到本地
      auth.setItem(state.user)
    }
  }

})

export default store
