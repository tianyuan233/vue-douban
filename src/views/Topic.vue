<template>
  <div class="topic">
    <van-nav-bar title="详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-panel :title="title" :desc="desc">
      <div v-html="content"></div>
    </van-panel>
    <van-divider></van-divider>
    <div class="collectBtn">
      <van-button type="info" size="large"
      @click="onClickDelCollect" v-if="is_collect">
      已收藏</van-button>
      <van-button plain type="info" size="large"
      @click="onClickCollect" v-else>
      点击收藏</van-button>
    </div>
    <van-divider>{{reply_count}}次回复</van-divider>
  </div>
</template>
<script>
import Vue from 'vue';
import {
  NavBar, Panel, Divider, Button, Toast,
} from 'vant';
import formatTime from '@/mixins';

Vue.use(Toast);
Vue.use(NavBar)
  .use(Panel)
  .use(Divider)
  .use(Button);

export default {
  mixins: [formatTime],
  data() {
    return {
      title: '',
      content: '',
      loginname: '',
      create_at: '',
      visit_count: '',
      reply: {},
      reply_count: '',
      is_collect: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.history.go(-1);
    },
    onClickCollect() {
      this.$api.topics
        .collectTopicById(this.$route.params.id)
        .then(({ data }) => {
          if (data.success) {
            this.is_collect = !this.is_collect;
            Toast.success('已收藏');
          } else {
            Toast.fail('失败');
          }
        });
    },
    onClickDelCollect() {
      this.$api.topics
        .delcollectTopicById(this.$route.params.id)
        .then(({ data }) => {
          if (data.success) {
            this.is_collect = !this.is_collect;
            Toast.success('取消收藏');
          } else {
            Toast.fail('操作失败');
          }
        });
    },
  },
  mounted() {
    this.$api.topics.getDetailById(this.$route.params.id).then(({ data }) => {
      if (data.success) {
        const topic = data.data;
        this.title = topic.title;
        this.content = topic.content;
        this.loginname = topic.author.loginname;
        this.create_at = topic.create_at;
        this.visit_count = topic.visit_count;
        this.reply_count = topic.reply_count;
        this.is_collect = topic.is_collect;
      }
    });
  },
  computed: {
    desc() {
      return `作者${this.loginname} 发布于${this.format(this.create_at)} ${
        this.visit_count
      }次浏览`;
    },
  },
};
</script>

<style lang="scss">
.topic {
  .markdown-text {
    padding: 10px 16px;
    p {
      white-space: pre-wrap;
      font-size: 14px;
      color: #323233;
      img {
        width: auto\9;
        height: auto;
        max-width: 100%;
        vertical-align: middle;
        border: 0;
        -ms-interpolation-mode: bicubic;
      }
    }
  }
  .collectBtn {
    padding: 0 16px;
  }
}
</style>
