const express = require('express');
const dealOfWeekController = require('../controllers/dealOfWeekController');
const authController = require('../controllers/authController');

const router = express.Router();


router
  .route('/')
  .get(dealOfWeekController.getAllDealOfWeek)

router
  .route('/:id')
  .get(dealOfWeekController.getDealOfWeek)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    dealOfWeekController.uploadImages,
    dealOfWeekController.resizeImages,
    dealOfWeekController.updateDealOfWeek
  )
  
module.exports = router;
