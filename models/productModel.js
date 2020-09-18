const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    category_id: mongoose.Schema.ObjectId,
    mrp: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    status: {
      type: Boolean,
      default: true
    },
    onsale: {
      type: Boolean,
      default: true
    },
    featureProduct: {
      type: Boolean
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

productSchema.index({ price: 1 });
//productSchema.index({ price: 1, ratingsAverage: -1 });
productSchema.index({ slug: 1 });




// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// productSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// productSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// productSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });



const Product = mongoose.model('Product', productSchema);

module.exports = Product;
