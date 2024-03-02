const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());
const SECRET_KEY = '123456';

function authenticateAndAuthorize(req, res, next) {
  const token = req.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token missing.' });
  }
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userRole = decodedToken.role;
    if (userRole !== 'admin') {
      return res.status(403).json({ message: 'Authorization failed. Insufficient' });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
}

const dummyUser = {
  id: 1,
  username: 'admin',
  role: 'admin',
};

app.get('/generate-token', (req, res) => {
  const token = jwt.sign(dummyUser, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/admin-route', authenticateAndAuthorize, (req, res) => {
  res.json({ message: 'Admin route accessed successfully.', user: req.user });
});

app.listen(3000, () => {
  console.log("app running");
});