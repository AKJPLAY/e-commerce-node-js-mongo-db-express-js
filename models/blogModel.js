const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A post must have a name'],
      unique: true,
      trim: true,
      minlength: [2, 'A post name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'Post name must only contain characters']
    },
    slug: String,
    description: {
      type: String,
      trim: true,
      required: [true, 'A post must have a description']
    },
    imageCover: {
      type: String,
      required: [true, 'A post must have a cover image']
    },
    status: {
      type: Boolean,
      default: true
    },
    comment: {
      type: Number
    },
    onhome: {
      type: Boolean,
      default: true
    },
    featurePost: {
      type: Boolean
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//blogSchema.index({ price: 1, ratingsAverage: -1 });
blogSchema.index({ slug: 1 });




// DOCUMENT MIDDLEWARE: runs before .save() and .create()
blogSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// blogSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// blogSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// blogSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });



const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
