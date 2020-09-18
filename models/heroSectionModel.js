const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

const heroSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, 'Hero Section must have a heading'],
      unique: true,
      trim: true,
      maxlength: [40, 'Hero Section must name must have less or equal then 40 characters'],
      minlength: [5, 'Hero Section must name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    subHeading: {
      type: String,
      required: [true, 'Hero Section must have a sub heading'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Hero Section must have a category'],
      trim: true,
    },
    offSale: {
      type: String,
      required: [true, 'Hero Section must have Off Sale Text'],
      trim: true,
    },
    btnText: {
      type: String,
      required: [true, 'Hero Section must have button text'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Hero Section must have Image'],
      trim: true,
    },
    slug: String,
    status: {
        type: Boolean,
        default: true,
        required: [true, 'Hero-section must be true and false']
    }
    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

heroSectionSchema.index({ slug: 1 });




// DOCUMENT MIDDLEWARE: runs before .save() and .create()
heroSectionSchema.pre('save', function(next) {
  this.slug = slugify(this.heading, { lower: true });
  next();
});


const HeroSection = mongoose.model('HeroSection', heroSectionSchema);

module.exports = HeroSection;
