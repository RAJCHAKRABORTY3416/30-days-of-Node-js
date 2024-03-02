const mongoose = require('mongoose');

// Define the Mongoose schema for User
const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

// Create the Mongoose model for User
const User = mongoose.model('User', userSchema);

// Connect Mongoose to MongoDB
mongoose.connect('mongodb+srv://iamraj:Iamraj@chakraborty3416@atlascluster.ri78gdm.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Implement the function to add a new user to the MongoDB database
async function addUserToDatabase(user) {
  try {
    // Create a new User object
    const newUser = new User(user);
    // Save the user to the database
    await newUser.save();
    console.log('User added successfully:', newUser);
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

// Test the function
addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });
