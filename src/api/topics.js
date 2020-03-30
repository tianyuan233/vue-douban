import axios from './http'; // 导入http中创建的axios实例
import base from './base'; // 导入接口域名列表

const topics = {
  getTopicsByTab(page, limit, tab) {
    return axios.get(`${base.main}/topics`, {
      params: {
        page, limit, tab,
      },
    });
  },
};

export default topics;
