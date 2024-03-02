const express = require('express');
const mongoose = require('mongoose');
const User = require('./user'); // Assuming your User model is in a models/user.js file

const app = express();
const port = 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: true,  // Disable buffering for better timeout handling
  socketTimeoutMS: 30000
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define the Express route to get all users
app.get('/users', getAllUsers);

function getAllUsers(req, res) {
  User.find()
    .then(users => res.json(users)) // Send the users as a JSON response
    .catch(err => res.status(500).json({ error: err.message })); // Handle errors
}

// Start the Express server
app.listen(port, () => console.log('Server listening on port ${port}'));