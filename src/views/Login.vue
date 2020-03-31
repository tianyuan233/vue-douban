<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="token"
        name="token"
        placeholder="请输入Accesstoken"
        input-align="center"
        :rules="[{ required: true, message: '请输入token' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div style="margin: 16px;">
      <van-button
        round
        block
        type="info"
        ref="copyBtn"
        data-clipboard-text="cc3f9f9e-07e1-4238-97eb-4b43ca2fc7a8"
      >获取测试token</van-button>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="info" @click="goBack">返回前页</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  Form, Field, Button, Notify,
} from 'vant';
import store from 'store';
import Clipboard from 'clipboard';
import router from '../router';

Vue.use(Form)
  .use(Field)
  .use(Notify)
  .use(Button);
export default {
  data() {
    return {
      token: '',
    };
  },
  mounted() {
    this.initClipboard();
  },
  methods: {
    // 初始化复制插件
    initClipboard() {
      const clipboard = new Clipboard(this.$refs.copyBtn);
      clipboard.on('success', () => {
        Notify({ type: 'primary', message: '已将token复制到剪贴板,请在输入框中粘贴后登录' });
      });
    },
    onSubmit() {
      this.$api.user.validate(this.token).then(({ data }) => {
        if (data.success) {
          store.set('loginname', data.loginname);
          store.set('token', this.token);
          router.replace({ path: '/profile' });
        }
      });
    },
    goBack() {
      this.$router.history.go(-1);
    },
  },
};
</script>

<style lang="scss">
.login {
  margin-top: 50%;
}
</style>
