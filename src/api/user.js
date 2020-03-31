import axios from './http'; // 导入http中创建的axios实例
import base from './base'; // 导入接口域名列表

const user = {
  validate(accesstoken) {
    return axios.post(`${base.main}/accesstoken`, {
      accesstoken,
    });
  },
  getUserInfo(name) {
    return axios.get(`${base.main}/user/${name}`);
  },
};


export default user;
