const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();


router
  .route('/')
  .get(blogController.getAllPosts)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    blogController.createPost
  );

router
  .route('/:id')
  .get(blogController.getPost)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    blogController.uploadPostImages,
    blogController.resizePostImages,
    blogController.updatePost
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    blogController.deletePost
  );

module.exports = router;
