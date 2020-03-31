<template>
  <div class="collect">
    <van-nav-bar
    title="已收藏列表"
    />
    <van-list>
        <van-cell
        v-for="topic in collect_topics"
        :key="topic.id"
        :title="topic.title"
        :label="[topic.author.loginname +' 发布于'+ format(topic.create_at)].join()"
        is-link :to="'/topic/' + topic.id"
         />
    </van-list>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/collect" icon="star-o">收藏</van-tabbar-item>
      <van-tabbar-item replace to="/profile" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from 'vue';
import {
  NavBar, List, Cell,
} from 'vant';
import store from 'store';
import moment from 'moment';

Vue.use(NavBar, List, Cell);
export default {
  data() {
    return {
      collect_topics: [],
    };
  },
  methods: {
    format(time) {
      moment.locale('zh-cn');
      return moment(time).fromNow();
    },
  },
  mounted() {
    const name = store.get('loginname');
    this.$api.topics.getCollectByName(name).then(({ data }) => {
      if (data.success) {
        this.collect_topics = data.data;
      }
    });
  },
};
</script>
