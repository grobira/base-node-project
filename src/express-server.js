import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ status: 'Working' });
});

app.listen(8080, () => {
  console.log('Listening to port 8080');
});

export default app;
