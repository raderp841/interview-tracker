const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://sourceallies:QmXqrvZT1cF0j7b3@trackerdata.pgqoq.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to db');
  })
  .catch(err => {
    console.log(err);
    console.log('db connection failed');
  })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  console.log('how many times');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts/new', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save()

  res.status(201).json({
    message: 'post added successfully'
  });
});

app.get('/api/posts',(req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    })
    .catch(console.log);

});

module.exports = app;
