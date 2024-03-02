const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2, // limit each IP to 2 requests per windowMs
  message: 'Too many requests'
});

// Apply rate limiting middleware to all requests
app.use(limiter);

// Route handler
app.get('/', (req, res) => {
  res.send('Hello World !!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});