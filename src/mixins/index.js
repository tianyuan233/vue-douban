import moment from 'moment';

const formatTime = {
  methods: {
    format(time) {
      moment.locale('zh-cn');
      return moment(time).fromNow();
    },
  },
};

export default formatTime;
