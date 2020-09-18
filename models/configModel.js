const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');

const configSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Config option must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'Config option must name must have less or equal then 40 characters'],
      minlength: [5, 'Config option must name must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    enable: {
        type: Boolean,
        default: true,
        required: [true, 'Config option must be true and false']
    }
    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

configSchema.index({ slug: 1 });




// DOCUMENT MIDDLEWARE: runs before .save() and .create()
configSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});


const Config = mongoose.model('Config', configSchema);

module.exports = Config;
