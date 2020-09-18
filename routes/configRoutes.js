const express = require('express');
const configController = require('./../controllers/configController');
const authController = require('./../controllers/authController');

const router = express.Router();
router
  .route('/')
  .get(configController.getConfigOption)
router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    configController.updateConfigOption
  );

module.exports = router;
