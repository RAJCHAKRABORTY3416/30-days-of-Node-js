const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb+srv://iamraj:xH6uhl0qcZuJAx16@cluster01.4edi3f5.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User schema with required age field and validation
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true, validate: { validator: Number.isInteger, message: 'Age must be an integer' } },
});

const User = mongoose.model('User', userSchema);

// Function to calculate average age (handles empty results)
async function averageAgeOfUsers(req, res) {
  try {
    const averageAge = await User.aggregate([
      { $match: { age: { $exists: true } } }, // Filter users with existing age
      { $group: { _id: null, averageAge: { $avg: '$age' } } }, // Calculate average
    ]);

    if (averageAge.length === 0) {
      return res.status(204).json({ message: 'No users with age found' });
    }

    res.json({ averageAge: averageAge[0].averageAge });
  } catch (error) {
    console.error('Error calculating average age:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Express route
app.get('/average-age', averageAgeOfUsers);

// Function to add a user with validation (example usage)
async function addUserWithValidation(username, email, age) {
  const newUser = new User({ username, email, age });

  try {
    await newUser.save();
    console.log('User added successfully:', newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Validation error:', error.message);
    } else {
      console.error('Error adding user:', error);
    }
  }
}

// Example usage (comment out if not needed)
addUserWithValidation('john_doe', 'john@example.com', 30);
addUserWithValidation('jane_doe', 'jane@example.com', 25);

// Start the server
app.listen(port, () => console.log('Server listening on port ${port}'));