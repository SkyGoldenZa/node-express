const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const app = express();

const connectionString = 'mongodb+srv://sky:n6QRJRFQcjcGllRW@cluster0.byp9z.mongodb.net/node-angular?retryWrites=true&w=majority';

mongoose.connect(
   connectionString,
   { useNewUrlParser: true, useUnifiedTopology: true }
)
   .then(() => {
      console.log('Connected to database!');
   })
   .catch((err) => {
      console.log('err', err);
      console.log('Database connection failed!');
   });

app.use(bodyParser.json());

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
   next();
});

app.post('/api/posts', (req, res, next) => {
   const post = new Post({
      title: req.body.title,
      content: req.body.content,
   });
   post.save();
   res.status(201).json({ message: 'Post added successfully' });
});

app.get('/api/posts', (req, res, next) => {
   const posts = [
      {
         id: '1234567890',
         title: 'First server side title',
         content: 'This content is coming from the server.',
      },
      {
         id: '0987654321',
         title: 'Second server side title',
         content: 'This content is coming from the server!',
      }
   ];
   res.status(200).json({
      message: 'Posts fetched successfully!',
      posts,
   });
});

module.exports = app;
