const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts');

router.route('/')
  .get(postsController.getPosts)
  .post(postsController.createPost)

router.route('/:id')
  .get(postsController.getPost)
  .put(postsController.updatePost)
  .delete(postsController.deletePost)

module.exports = router;
