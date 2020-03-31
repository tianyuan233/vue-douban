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
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  Form, Field, Button,
} from 'vant';
import store from 'store';
import router from '../router';


Vue.use(Form)
  .use(Field)
  .use(Button);
export default {
  data() {
    return {
      token: '',
    };
  },
  methods: {
    onSubmit() {
      this.$api.user.validate(this.token).then(({ data }) => {
        if (data.success) {
          store.set('loginname', data.loginname);
          store.set('token', this.token);
          router.replace({ path: '/profile' });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login {
  margin-top: 50%;
}
</style>
