<template>
  <div class="topic">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>
<script>
import Vue from 'vue';
import { NavBar } from 'vant';

Vue.use(NavBar);
export default {
  methods: {
    onClickLeft() {
      this.$router.history.go(-1);
    },
  },
};
</script>
