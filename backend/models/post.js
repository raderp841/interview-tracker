const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type : String, required: true},
  content: { type : String, required: true},
  parentPost: {type : String, required: false},
  createdDate: {type : Date, required: true, default: new Date()},
  dueDate: {type : Date, required: true, default: new Date()},

});

module.exports = mongoose.model('Post', postSchema);
