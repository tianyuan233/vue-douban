import momment from 'moment';

function format(time) {
  return momment(time).fromNow();
}

export default { format };
