const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Create the model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
