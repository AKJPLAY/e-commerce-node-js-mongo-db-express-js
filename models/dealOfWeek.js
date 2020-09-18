const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

const dealOfWeekSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, 'must have a heading'],
      unique: true,
      trim: true,
      minlength: [2, 'name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'Post name must only contain characters']
    },
    itemName: {
      type: String,
      required: [true, 'must have a name'],
      trim: true,
      minlength: [2, 'name must have more or equal then 10 characters']
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
    price: {
      type: Number
    },
    time: [
      {
        Day: {
          type: Number
        },
        Hrs: {
          type: Number
        },
        Μins: {
          type: Number
        }
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//dealOfWeekSchema.index({ price: 1, ratingsAverage: -1 });
dealOfWeekSchema.index({ slug: 1 });




// DOCUMENT MIDDLEWARE: runs before .save() and .create()
dealOfWeekSchema.pre('save', function(next) {
  this.slug = slugify(this.heading, { lower: true });
  next();
});

// dealOfWeekSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// dealOfWeekSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// dealOfWeekSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });



const DealOfWeek = mongoose.model('DealOfWeek', dealOfWeekSchema);

module.exports = DealOfWeek;
