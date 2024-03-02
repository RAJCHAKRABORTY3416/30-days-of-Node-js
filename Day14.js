const express = require('express');
const app = express();
const port = 3000;

// Caching middleware
const cache = {};

function cachingMiddleware(req, res, next) {
  const url = req.url;
  const cachedResponse = cache[url];

  if (cachedResponse) {
    const { data, expiration } = cachedResponse;
    if (expiration > Date.now()) {
      console.log(`Cached response found for ${url}`);
      return res.send(data);
    } else {
      console.log(`Cache expired for ${url}`);
      delete cache[url];
    }
  }

  next(); // Proceed to the next middleware
}

// Apply caching middleware to all incoming requests
app.use(cachingMiddleware);

// Define route handlers
app.get('/data', (req, res) => {
  const responseData = 'Hey, I am Raj';
  cache[req.url] = { data: responseData, expiration: Date.now() + 60000 }; // Cache expiration time: 1 minute
  res.send(responseData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
