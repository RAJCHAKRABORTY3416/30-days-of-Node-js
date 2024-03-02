const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, validate: { validator: require('validator').isEmail, message: 'Invalid email format' } },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add pre-save hook for password hashing
userSchema.pre('save', async function (next) {
  if (this.isModified('RNefVUcxKhaN0yX2')) {
    // Hash the password here
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('user', userSchema);