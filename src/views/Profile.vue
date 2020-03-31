<template>
  <div class="profile">
    <div class="avatarWrapper">
      <van-image class="avatar" width="100px" height="100px" :src="avatar_url">
        <template v-slot:error>头像加载失败</template>
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
    </div>
    <div class="info">
      <van-cell-group title="用户名">
        <van-cell :title="loginname" />
      </van-cell-group>
      <van-cell-group title="注册时间">
        <van-cell :title="format(create_at)" />
      </van-cell-group>
      <van-cell-group title="现有积分">
        <van-cell :title="score" />
      </van-cell-group>
    </div>
    <van-cell-group title="主题">
      <van-cell title="已创建" is-link to="index" :value="topic_count + '个'"></van-cell>
      <van-cell title="已参与" is-link to="index" :value="reply_count + '个'"></van-cell>
    </van-cell-group>
    <div class="logout">
      <van-button type="danger" round block @click="onClickLogout">退 出</van-button>
    </div>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/collect" icon="star-o">收藏</van-tabbar-item>
      <van-tabbar-item replace to="/profile" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import moment from 'moment';
import Vue from 'vue';
import {
  Cell, CellGroup, Image, Divider, Button, Loading, Tag,
} from 'vant';
import store from 'store';
import router from '../router';

Vue.use(Cell)
  .use(CellGroup)
  .use(Image)
  .use(Divider)
  .use(Loading)
  .use(Tag)
  .use(Button);
export default {
  data() {
    return {
      loginname: '',
      avatar_url: '',
      create_at: '',
      score: 0,
      recent_topics: {},
      recent_replies: {},
    };
  },
  methods: {
    onClickLogout() {
      store.clearAll();
      router.replace({ path: '/' });
    },
    format(time) {
      moment.locale('zh-cn');
      return moment(time).fromNow();
    },
  },
  mounted() {
    const loginname = store.get('loginname');
    this.$api.user.getUserInfo(loginname).then(({ data }) => {
      if (data.success) {
        this.loginname = data.data.loginname;
        this.avatar_url = data.data.avatar_url;
        this.create_at = data.data.create_at;
        this.score = data.data.score;
        this.recent_topics = data.data.recent_topics;
        this.recent_replies = data.data.recent_replies;
      }
    });
  },
  computed: {
    reply_count() {
      return 6;
    },
    topic_count() {
      return 5;
    },
  },
};
</script>
<style lang="scss" scoped>
.profile {
  margin-bottom: 70px;
  background-color: #f7f8fa;
  .avatarWrapper {
    position: relative;
    height: 150px;
    .avatar {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .other {
    height: 300px;
  }
  .logout {
    padding: 16px 0;
  }
}
</style>
