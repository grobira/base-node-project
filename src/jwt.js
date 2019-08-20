import express from 'express';
import { sign, verify } from 'jsonwebtoken';

const app = express();

const secret = 'patati-patata';

app.get('/login', (req, res) => {
  res.json({ data: 'Hello World', token: createJWToken(req.headers.user) });
});

app.use((req, res, next) => {
  const token = req.headers.authorization;
  verifyJWTToken(token)
    .then(decodedToken => {
      req.user = decodedToken.data;
      next();
    })
    .catch(err => {
      res.status(401).send({ error: err });
    });
});

app.get('/', (req, res) => {
  res.json({ data: req.user });
});

app.listen(3000);

function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    verify(token, secret, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }

      resolve(decodedToken);
    });
  });
}

function createJWToken(user) {
  const token = sign(
    {
      data: { user, pass: '123' },
    },
    secret,
    {
      expiresIn: 3600,
      algorithm: 'HS256',
    }
  );

  return token;
}

export default app;
