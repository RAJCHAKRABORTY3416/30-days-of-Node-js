const express = require('express');
const app = express();

// Logging middleware for Express
function loggingMiddleware(req, res, next) {
  // Create a timestamp
  const timestamp = new Date().toISOString();

  // Log request details
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log(`Headers:`);
  Object.entries(req.headers).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
  console.log(`Body: ${JSON.stringify(req.body, null, 2)}`);

  // Call next() to continue processing the request
  next();
}

// Apply the middleware to all routes
app.use(loggingMiddleware);

// ... your routes here
app.get('/', (req, res) => {
  const responseData = 'Hello everyone , I am Raj';
  res.send(responseData);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
