const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  user_name: { type : String, required: true}
});

module.exports = mongoose.model('User', userSchema);
