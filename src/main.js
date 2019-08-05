import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入vant
import vant from 'vant'
import 'vant/lib/index.css'
// 导入Store
import store from '@/store/index.js'
// 登录验证
import VeeValidate, { Validator } from 'vee-validate'
// 导入语言
import zhCN from 'vee-validate/dist/locale/zh_CN'
// import { reject } from 'q'
// 注册
Vue.use(VeeValidate)
Vue.use(vant)
// 语言
Validator.localize('zhCN', zhCN)
Validator.extend('phone', {
  getMessage: field => '请输入正确的手机号',
  validate: value =>
    value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
})
// 设置睡眠延迟加载
Vue.prototype.$sleep = (time) => {
  // 用一个Promise来处理异步操作
  return new Promise((resolve, reject) => {
    // 设置定时器
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
