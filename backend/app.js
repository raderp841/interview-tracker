const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const User = require('./models/user');

const app = express();

mongoose.connect('mongodb+srv://sourceallies:'+process.env.MONGO_ATLAS_PW+'@trackerdata.pgqoq.mongodb.net/sadb?retryWrites=true&w=majority')
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts/new', (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const user_id = req.body.user_id;

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    user_id: req.body.user_id
  });

  post.save()
    .then((docs) => {
      res.status(200).json({
        post: docs,
        message: 'post added successfully'
      });
    })
    .catch(console.log);
});

app.post('/api/posts/delete', (req, res, next) => {
  Post.deleteOne({'_id' : req.body.post_id})
    .then(() => {})
    .catch(console.log);

    res.status(201).json({
      message: 'post deleted successfully'
    });
})

app.get('/api/posts',(req, res, next) => {
  const user_id = req.query.user_id;
  Post.find({'user_id': user_id})
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    })
    .catch(console.log);
});

app.get('/api/user', (req, res, next) => {
  User.findOne({'user_name': req.query.user_name})
    .then(documents => {
      res.status(200).json({
        message: 'successfully retrieved user',
        user: documents
      })
    })
    .catch(console.log);
});

app.post('/api/user', (req, res, next) => {
  //should check if username taken
  const user = new User({
    user_name: req.body.user_name
  });

  user.save()
    .then(documents => {
      res.status(200).json({user:documents});
    })
    .catch(err => {
      res.status(400).json({message: 'username already exists'});
      console.log(err);
    });
})

module.exports = app;
