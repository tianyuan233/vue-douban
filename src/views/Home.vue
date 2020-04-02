<template>
  <div class="home">
    <van-tabs sticky swipeable animated color="#3388ff">
      <van-tab title="全部">
        <List tag></List>
      </van-tab>
      <van-tab title="精选">
        <List tag="good"></List>
      </van-tab>
      <van-tab title="问答">
        <List tag="ask"></List>
      </van-tab>
      <van-tab title="分享">
        <List tag="share"></List>
      </van-tab>
      <van-tab title="招聘">
        <List tag="job"></List>
      </van-tab>
    </van-tabs>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/collect" icon="star-o">收藏</van-tabbar-item>
      <van-tabbar-item replace to="/profile" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Vue from 'vue';
import { Tab, Tabs } from 'vant';

import List from '@/components/List.vue';

Vue.use(Tab).use(Tabs);
export default {
  name: 'Home',
  components: {
    List,
  },
};
</script>
