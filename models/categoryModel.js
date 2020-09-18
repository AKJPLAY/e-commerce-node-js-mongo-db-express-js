const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A category must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A category name must have less or equal then 40 characters'],
      minlength: [2, 'A category name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    status: {
      type: Boolean,
      default: true
    },
    onhome: {
      type: Boolean,
      default: true
    },
    featureCategory: {
      type: Boolean
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//categorySchema.index({ price: 1, ratingsAverage: -1 });
categorySchema.index({ slug: 1 });




// DOCUMENT MIDDLEWARE: runs before .save() and .create()
categorySchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// categorySchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// categorySchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// categorySchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });



const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
