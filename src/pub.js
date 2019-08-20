import redis from 'redis';
const pub = redis.createClient();
const sub = redis.createClient();

const test = {
  a: 'message',
  b: 'another message',
};
setInterval(() => {
  pub.publish('topic', JSON.stringify(test));
}, 3000);

sub.subscribe('topic.3');

sub.on('message', (channel, message) => {
  pub.publish(`${message}`, JSON.stringify({ data: 'deal with that data' }));
});
