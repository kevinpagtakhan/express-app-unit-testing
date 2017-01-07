const Post = require('../models/Post');

function getPosts(req, res) {
  Post.find({}, (err, posts) => {
    if(err) return res.send(err);
    res.json({
      posts
    });
  });
}

function createPost(req, res) {
  Post.create(req.body, (err, post) => {
    if(err) return res.send(err);
    res.json({
      post
    })
  });
}

function getPost(req, res) {
  Post.findById(req.params.id, (err, post) => {
    if(err) return res.send(err);
    res.json({
      post
    })
  })
}

function updatePost(req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, post) => {
    if(err) return res.send(err);
    res.json({
      post
    })
  })
}

function deletePost(req, res) {
  Post.remove({ _id: req.params.id }, (err, result) => {
    if(err) return res.send(err)
    res.json({
      result
    })
  })
}

module.exports = {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost
};
