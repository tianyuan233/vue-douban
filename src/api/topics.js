import store from 'store';
import axios from './http'; // 导入http中创建的axios实例
import base from './base';
// 导入接口域名列表
const topics = {
  getTopicsByTab(page, limit, tab) {
    return axios.get(`${base.main}/topics`, {
      params: {
        page, limit, tab,
      },
    });
  },
  getDetailById(id) {
    const accesstoken = store.get('token');
    console.log(accesstoken);
    return axios.get(`${base.main}/topic/${id}?accesstoken=${accesstoken}`);
  },
  collectTopicById(id) {
    const accesstoken = store.get('token');
    return axios.post(`${base.main}/topic_collect/collect`, {
      accesstoken,
      topic_id: id,
    });
  },
  delcollectTopicById(id) {
    return axios.post(`${base.main}/topic_collect/de_collect`, {
      accesstoken: base.token,
      topic_id: id,
    });
  },
};

export default topics;
