<template>
  <div>
    <div>
      test
    </div>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/collect" icon="star-o">收藏</van-tabbar-item>
      <van-tabbar-item replace to="/profile" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';

Vue.use(Tab).use(Tabs);
export default {};
</script>
