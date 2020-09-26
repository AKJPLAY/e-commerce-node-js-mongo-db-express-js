const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();
//Availabe Session for View Template
router.use(function(req, res, next) {
  if(req.session.hasOwnProperty('cart')) {
    res.locals.totalQty = req.session.cart.totalQty;  
    res.locals.totalPrice = req.session.cart.totalPrice.toFixed();  
    res.locals.cartProducts = req.session.cart.items;
  }

  if(req.session.hasOwnProperty('wishList')) {
    res.locals.wishTotalQty = req.session.wishList.totalQty;  
    res.locals.wishListProducts = req.session.wishList.items;
  }

  res.locals.session = req.session;
  
  next();
});
router.use(authController.isLoggedIn);
router.use(viewsController.alerts);

router.get('/', viewsController.getOverview);

router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);

router.get('/shop', viewsController.getShopPage);
router.get('/shop/:slug',  viewsController.getProduct);
router.get('/cart',  viewsController.getCartPage);
router.get('/wishList',  viewsController.getWishListPage);
router.get('/faq',  viewsController.getFaqPage);
router.get('/blog',  viewsController.getBlogPage);
router.get('/post',  viewsController.getPostPage);
router.get('/checkout',  viewsController.getCheckoutPage);
router.get('/login',  viewsController.getLoginForm);
router.get('/register',  viewsController.getRegisterForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.get('/my-tours', authController.protect, viewsController.getMyTours);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

//Admin Area
router.get('/admin', viewsController.getAdminPage);
router.get('/products', viewsController.getProductsPage);
router.get('/categories', viewsController.getCategoriesPage);


module.exports = router;
