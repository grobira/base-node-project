import redis from 'redis';

const pub = redis.createClient();
const sub = redis.createClient();

sub.subscribe('topic');
sub.subscribe('1');

sub.on('message', (channel, message) => {
  console.log(channel, JSON.parse(message));
  pub.publish('topic.3', '1');
});
