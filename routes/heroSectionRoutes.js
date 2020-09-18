const express = require('express');
const heroSectionController = require('./../controllers/heroSectionController');
const authController = require('./../controllers/authController');

const router = express.Router();
router
  .route('/')
  .get(heroSectionController.getHeroSection)
router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    heroSectionController.updateHeroSection
  );

module.exports = router;
