const multer = require('multer');
const sharp = require('sharp');
const Blog = require('../models/blogModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadPostImages = upload.fields([
  { name: 'imageCover', maxCount: 1 }
]);

// upload.single('image') req.file
// upload.array('images', 5) req.files

exports.resizePostImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover) return next();

  // 1) Cover image
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/tours/${req.body.imageCover}`);

  next();
});

exports.getAllPosts = factory.getAll(Blog);
exports.getPost = factory.getOne(Blog);
exports.createPost = factory.createOne(Blog);
exports.updatePost = factory.updateOne(Blog);
exports.deletePost = factory.deleteOne(Blog);
