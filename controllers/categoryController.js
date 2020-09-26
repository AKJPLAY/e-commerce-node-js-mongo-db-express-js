const multer = require('multer');
const sharp = require('sharp');
const Category = require('../models/categoryModel');
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

exports.uploadCategoryImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 }
]);

// upload.single('image') req.file
// upload.array('images', 5) req.files

exports.resizeCategoryImages = catchAsync(async (req, res, next) => {
  if(!req.files) {
    return next();
  }
  // 1) Cover image
    if(req.body.imageCover){
      req.body.imageCover = `category-${Date.now()}-cover.jpeg`;
      await sharp(req.files.imageCover[0].buffer)
        .resize(570, 320)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/categories/${req.body.imageCover}`);
    }
    
    // 2) Images
    if(req.body.images){
      req.body.images = [];

      await Promise.all(
        req.files.images.map(async (file, i) => {
          const filename = `category-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

          await sharp(file.buffer)
            .resize(570, 320)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/categories/${filename}`);

          req.body.images.push(filename);
        })
      );  
    }
  next();
});


exports.getAllCategories = factory.getAll(Category);
exports.getCategory = factory.getOne(Category);
exports.createCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
