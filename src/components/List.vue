<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad">
        <van-cell
        v-for="topic in topics"
        :key="topic.id"
        :title="topic.title"
        :label="[topic.author.loginname +' '+topic.create_at].join()"
        is-link :to="'/topic/' + topic.id"
         />
    </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import Vue from 'vue';
import {
  Card, List, Cell, PullRefresh,
} from 'vant';

Vue.use(Cell);
Vue.use(PullRefresh);
Vue.use(Card).use(List);

export default {
  props: {
    tag: {
      type: String,
    },
  },
  data() {
    return {
      topics: [],
      loading: false,
      finished: false,
      refreshing: false,

    };
  },
  methods: {
    onLoad() {
      this.$api.topics.getTopicsByTab(this.currentpage + 1, 10, this.tag).then((res) => {
        if (res.data.success) {
          this.topics = this.topics.concat(res.data.data);
          this.loading = false;
        } else {
          this.finished = true;
        }
      });
      this.refreshing = false;
    },
    onRefresh() {
      // 清空列表数据
      this.topics = [];
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
      this.refreshing = false;
    },
  },
  computed: {
    currentpage() {
      return this.topics.length / 10;
    },
  },
};
</script>


<style lang="scss">
</style>
