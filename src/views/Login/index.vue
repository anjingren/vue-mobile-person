<template>
  <div class="login-container">
    <van-nav-bar title="欢迎" />
    <van-cell-group>
  <van-field v-model="user.mobile" v-validate="'required||phone'" label="手机号" required name="phone" :error-message="errors.first('phone')" placeholder="请输入手机号" />
  <!-- <span>{{errors.first('phone')}}</span> -->
</van-cell-group>
<van-cell-group>
  <van-field v-model="user.code" label="验证码"  required placeholder="请输入验证码" />
</van-cell-group>
<van-button type="info" @click.prevent="handleLogin" block :loading="loadingnow">信息按钮</van-button>
  </div>
</template>

<script>
// 引入axios
// import axios from 'axios'
import { Login } from '@/api/user.js'
// import { setUser, getUser } from '@/utils/auth.js'
// import { setUser } from '@/store/indeeex.js'
import { mapMutations } from 'vuex'

export default {
  name: 'LoginHandel',
  data () {
    return {
      user: {
        mobile: '18801185985',
        code: '246810'
      },
      loadingnow: false
    }
  },
  computed: {
  },
  methods: {
    async handleLogin () {
      // const res = await this.axios.post('app/v1_0/authorizations', this.user)
      // const res = await Login(this.user)
      // console.log(res)
      try {
        this.loadingnow = true
        const { data: { data } } = await Login(this.user)
        // console.log(this.user)
        // 获取token,调用setItem方法
        this.setUser(data)
        // 如果成功，那么，我们就登录到home页面
        this.loadingnow = false
        this.$router.push('/')
      } catch (error) {
        // console.log(error)
      }
    },
    // mapMutations调用时在method中，而不是在computed中调用
    ...mapMutations(['setUser'])
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar{
    background-color: #1989FA;
    height: 200px;
}
.van-nav-bar__title{
    color:aliceblue;
}

.van-button {
        height: 200px;
}
</style>
