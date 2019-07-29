<template>
    <div class="home-container">
        <van-nav-bar
        title="首页"/>
        <van-tabs v-model="active" class="channel-tabs">
  <van-tab title="标签 1">内容 1</van-tab>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <!-- <p>刷新次数: {{ count }}</p> -->
</van-pull-refresh>
  <van-tab title="标签 2">内容 2</van-tab>
  <van-tab title="标签 3">内容 3</van-tab>
  <van-tab title="标签 4">内容 4</van-tab>
</van-tabs>
<!-- 列表 -->
<van-list
  v-model="loading"
  finished-text="没有更多了"

>
  <!-- :finished="finished" -->
    <!-- @load="onLoad" -->
  <van-cell
    v-for="item in list"
    :key="item"
    :title="item"
  />
</van-list>
    </div>
</template>

<script>
export default {
  name: 'home',

  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      active: 2,
      count: 0,
      isLoading: false
    }
  },
  components: {
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar{
    background-color: #1989FA;
    height: 200px;
}
.channel-tabs {
    margin-bottom: 100px;
}
.channel-tabs /deep/ .van-tabs_content {
    margin-top: 92px;
}
</style>
