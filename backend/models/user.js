const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  user_name: { type : String, required: true, index: true, unique: true}
});

module.exports = mongoose.model('User', userSchema);
