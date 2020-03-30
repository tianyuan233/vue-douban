<template>
  <div class="topic">
    <van-nav-bar title="详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-panel :title="topic.title" :desc="desc">
      <div v-html="topic.content"></div>
    </van-panel>
    <van-divider>{{topic.reply_count}}次回复</van-divider>
  </div>
</template>
<script>
import Vue from 'vue';
import { NavBar, Panel, Divider } from 'vant';

Vue.use(NavBar).use(Panel).use(Divider);
export default {
  data() {
    return {
      topic: {},
    };
  },
  methods: {
    onClickLeft() {
      this.$router.history.go(-1);
    },
  },
  mounted() {
    this.$api.topics.getDetailById(this.$route.params.id).then(({ data }) => {
      if (data.success) {
        this.topic = data.data;
      }
    });
  },
  computed: {
    desc() {
      return `作者${this.topic.author.loginname}发布于${
        this.topic.create_at.split('T')[0]
      } ${this.topic.visit_count}次浏览`;
    },
  },
};
</script>

<style lang="scss">
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
</style>
