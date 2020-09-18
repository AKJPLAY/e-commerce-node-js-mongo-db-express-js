const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.sendSession = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        session: req.session
    });
});

exports.updateSession = catchAsync(async (req, res, next) => {
    let cart = req.body.cart;
    let wishList = req.body.wishList;
    if(cart) {
        req.session.cart = cart;
    }
    if(wishList) {
        req.session.wishList = wishList;
    }
    res.status(200).json({
        status: 'success',
        message: 'Your Session Update SuccessFully'
    });
});

