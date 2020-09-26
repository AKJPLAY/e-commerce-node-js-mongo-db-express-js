const Tour = require('../models/tourModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const Config = require('../models/configModel');
const Category = require('../models/categoryModel');
const Blog = require('../models/blogModel');
const HeroSection = require('../models/heroSectionModel');
const Booking = require('../models/bookingModel');
const DealOfWeek = require('../models/dealOfWeek');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../models/cart');
const WishList = require('../models/wishList');


exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  const config = await Config.find();
  const posts = await Blog.find();
  const categories = await Category.find();
  const heroSection = await HeroSection.find();
  const dealOfWeek = await DealOfWeek.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('base', {
    title: 'All Tours',
    tours,
    config,
    heroSection,
    categories,
    posts,
    dealOfWeek
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    return next(new AppError('There is no product with that name.', 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('product', {
    title: `${product.name}`,
    product
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getRegisterForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Register in your account'
  });
};

exports.getShopPage = (req, res) => {
  res.status(200).render('shop', {
    title: 'Shop'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});


exports.getCartPage = (req, res) => {
  if(!req.session.cart) {
    res.status(200).render('cart', {
      title: 'Your Cart'
    });  
  }else {
    cart = new Cart(req.session.cart);
    res.status(200).render('cart', {
      title: 'Your Cart',
      totalPrice : cart.totalPrice,
      products : cart.getArry()
    });
  }
};

exports.getWishListPage = (req, res) => {
  if(!req.session.wishList) {
    res.status(200).render('wishList', {
      title: 'Your WishList'
    });  
  }else {
    wishList = new WishList(req.session.wishList);
    res.status(200).render('wishList', {
      title: 'Your Wishlist',
      products : wishList.getArry()
    });
  }
};


exports.getCheckoutPage = (req, res) => {
  if(!req.session.cart) {
      res.redirect('/cart')
  }else {
    cart = new Cart(req.session.cart);
    res.status(200).render('checkout', {
      title: 'Checkout',
      totalPrice : cart.totalPrice,
      products : cart.getArry()
    });
  }
};

exports.getFaqPage = (req, res) => {
  res.status(200).render('faq', {
    title: 'FAQ'
  });
};

exports.getBlogPage = (req, res) => {
  res.status(200).render('blog', {
    title: 'Blog'
  });
};

exports.getPostPage = (req, res) => {
  res.status(200).render('post', {
    title: 'Post'
  });
};



//Admin Controllers
exports.getAdminPage = catchAsync(async (req, res, next) =>{
  res.status(200).render('adminbase', {
    title: 'Admin Area',
  });
});

exports.getProductsPage = catchAsync(async (req, res, next) =>{
  const categories = await Category.find();
    res.status(200).render('manageProducts', {
    title: 'Products',
    categories
  });
});

exports.getCategoriesPage = catchAsync(async (req, res, next) =>{
    res.status(200).render('manageProducts', {
    title: 'Categories'
  });
});