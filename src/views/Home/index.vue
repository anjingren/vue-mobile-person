<template>
  <div class="home-container">
    <!--navbar  -->
    <van-nav-bar title="首页/Home"></van-nav-bar>
    <!-- nav-tabs -->
    <div id="FullScreen">
    <van-tabs v-model="activeChannelIndex" class="channel-tabs">
      <van-tab :title="item.name" v-for="(item) in channels" :key="item.id">
        <!-- <van-pull-refresh v-model="item.downPulling" @refresh="onRefresh"> -->
           <van-pull-refresh v-model="item.downPullingFresh" @refresh="onRefresh">
          <!-- 相对应的list列表 -->
          <van-list @load="onLoad"  v-model="item.loadingItem" :finished="upFinished" finished-text="没有更多了"
          >
            <!-- v-model="item.upPulling" :finished="upPullFinished" finished-text="没有更多了" -->
            <van-cell v-for="item in item.articles" :key="item.art_id" :title="item.title" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    </div>
  </div>
</template>

<script>
import { channelOptions } from '@/api/channel.js'
import { getArticles } from '@/api/articles.js'

// 引入vuex
import { mapState } from 'vuex'
// 要把vuex中的数据转变为computed中的数据进行使用
export default {
  name: 'homeIndex',
  data () {
    return {
      activeChannelIndex: 0,
      loading: false,
      upFinished: false,
      // articles: [],
      count: 0,
      isLoading: false,
      channels: []
    }
  },
  computed: {
    ...mapState(['user']),
    activeChannel () {
      // 这个channels当前的激活的频道
      return this.channels[this.activeChannelIndex]
    }
  },
  // 监控滚动条
  watch: {
    //
  },
  // mounted () {
  //   document.getElementById('FullScreen').addEventListener('scroll', this.handleScroll)
  // },
  created () {
    this.channelList()
  },
  methods: {
    // 滚动条
    // handleScroll () {
    //   console.log(document.getElementById('orderFullScreen').scrollTop)
    // },
    // 获取channel列表内容 channelList
    async  channelList () {
      const localChannle = JSON.parse(window.localStorage.getItem('channels'))
      const user = this.user
      // 如果没登录，有本地
      if (!user && localChannle) {
        this.channels = localChannle
      }
      // 没登录，没本地 或者你登录
      if ((!user && !localChannle) || user) {
        const { data: { data } } = await channelOptions()

        data.channels.forEach(item => {
          item.articles = []
          item.loadingItem = false
          item.upFinished = false
          item.downPullingFresh = false
          // 给每个文章列表添加时间戳
          item.timestamp = Date.now()
        })
        this.channels = data.channels
        //
      }
      // console.log(this.channles)
      // 登录
      // if () {
      //   const { data } = await channelOptions()
      //   // console.log(data)
      //   this.channels = data.channels
      // }

      // const { data } = await channelOptions()
      // console.log(data.data)
      // this.channels = data.data.channels
      // 如果用户未登录，那么就直接请求把data.channels的值赋值给channels
      // 如果用户有登录，那么我们就要设置上请求头，然后再发送请求
      // 如果有user 也就是登录了
      // if (this.user) {
      //   // console.log(1111)
      //   // console.log(this.user)
      //   // 如果有user，我们就获取数据
      //   const { data } = await channelOptions()
      //   // console.log(data)
      //   this.channels = data.data.channels
      // } else {
      //   // console.log(2222)
      //   // 如果没有user，我们要进行判断是否有本地数据
      // const localChannle = JSON.parse(window.localStorage.getItem('channels'))
      //   // 如果有，就直接赋值给本地channels
      //   if (localChannle) {
      //     // console.log(33333)
      //     this.channels = localChannle
      //   } else {
      //     // console.log(44444)
      //     // 如果没有本地的数据，我们就发送请求进行获取
      //     const { data } = await channelOptions()
      //     this.channels = data.data.channels
      //   }
      // }
    },
    // 获取相对应的额文章列表
    async loadArticle () {
      // 解构数据
      // let id = this.activeChannel.id
      // let timestamp = this.activeChannel.pre_timestamp
      let { id: channel_id, timestamp } = this.activeChannel
      const { data: { data } } = await getArticles({
        channel_id,
        // timestamp: Date.now(),
        // timestamp: 1556789000001,
        timestamp,
        with_top: 1
      })
      // console.log(data)
      return data
    },
    async onLoad () {
      // 延迟加载
      await this.$sleep(800)
      // 异步更新数据   自动加载，在这里面获取文章列表数据
      let data = []
      data = await this.loadArticle()
      console.log(data)
      this.activeChannel.articles.push(...data.results)
      // 进行判断，因为第一次加载的时候是没有数据的，所以，我们需要配置时间戳
      if (data.pre_timestamp && data.results.length === 0) {
        this.activeChannel.timestamp = data.pre_timestamp
        // 因为第一次发送请求results是没有数据的，但是返回了历史时间戳，配置历史事件戳，重新获取article数据

        data = await this.loadArticle()
      }
      // 当书记全部加载完之后，也就是时间戳也不存在，并且data.resulets也没有数据的时候，我们在这个时候要让加载完成为true，并且，显示加载完成的文本
      if (!data.pre_timestamp && !data.results.length) {
        // 我们需要让加载完成变成true
        this.activeChannel.upFinished = true
        // 同时让加载中的这个动画也停止
        this.activeChannel.loadingItem = false
        // 没有数据的话，下面就不用再执行了，所以我们就return
        return
      }
      // 重新获取的数据赋值给文章列表
      this.activeChannel.articles.push(...data.results)
      // 更新历史时间戳
      this.activeChannel.timestamp = data.pre_timestamp
      // 同时在把数据加载完之后，就把加载中的效果停止
      this.activeChannel.loadingItem = false
    },
    /**
     * 1.数据时间戳流程，在一开始，我们初始化的时间戳是Date.now()  ,这个时候没有数据，有返回历史时间戳，所以，我们进行判断
     * 把这个返回的历史时间戳1给了当前的频道历史时间戳， 重新执行获取文章列表的代码
     * 2.在执行完之后，同时，我们再向下获取数据的时候，下一次的历史时间戳就是重新获取的数据列表返回的历史时间戳，所以，我们要更新历史时间戳
     *  */
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  }
}
</script>

<style>
.van-nav-bar {
  background-color: #1989fa;
  height: 200px;
  font-size: 30px;
  line-height: 200px;
  color: #fff;
  margin-bottom: 30px;
}
.van-tabs span {
  height: 200px;
  font-size: 30px;
}
.van-tab__pane {
  margin-top: 100px;
}
.channel-tabs{
margin-top: 100px;
width:100%;
}
.channel-tabs {
  position: fixed;
  top:200px;
}
.van-tabs__content {
  margin-bottom: 200px;
}

   .van-cell{
    height: 190px;
  }
</style>
