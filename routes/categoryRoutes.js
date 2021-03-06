const express = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    categoryController.uploadCategoryImages,
    categoryController.resizeCategoryImages,
    categoryController.createCategory
  );

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    categoryController.uploadCategoryImages,
    categoryController.resizeCategoryImages,
    categoryController.updateCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    categoryController.deleteCategory
  );

module.exports = router;
