import express from 'express';

const app = express();

app.use((req, res, next) => {
  console.log('before');

  next();

  res.on('finish', () => {
    console.log('after');
  });
});

app.get('/test', (req, res) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('in');
      res.send('ok');
      resolve();
    }, 1000);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000.');
  console.log('Test middleware calling /test.');
  console.log('Middleware should log a message : "before"');
  console.log('/test route should log a message : "in"');
  console.log('Middleware should log a message : "after"');
});
