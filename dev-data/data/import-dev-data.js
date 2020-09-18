const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const Config = require('./../../models/configModel');
const HeroSection = require('./../../models/heroSectionModel');
const Blog = require('./../../models/blogModel');
const DealOfWeek = require('./../../models/dealOfWeek');
const Category = require('./../../models/categoryModel');
const Product = require('./../../models/productModel');
const Review = require('./../../models/reviewModel');
const User = require('./../../models/userModel');

dotenv.config({ path: './config.env' });
/*
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
*/

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const config = JSON.parse(fs.readFileSync(`${__dirname}/config.json`, 'utf-8'));
const heroSection = JSON.parse(fs.readFileSync(`${__dirname}/heroSection.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const dealOfWeek = JSON.parse(fs.readFileSync(`${__dirname}/dealOfWeek.json`, 'utf-8'));
const posts = JSON.parse(fs.readFileSync(`${__dirname}/posts.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`${__dirname}/product.json`, 'utf-8'));
const categories = JSON.parse(fs.readFileSync(`${__dirname}/category.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await Config.create(config);
    await HeroSection.create(heroSection);
    await Category.create(categories ,{ validateBeforeSave: false });
    await Product.create(products ,{ validateBeforeSave: false });
    await DealOfWeek.create(dealOfWeek ,{ validateBeforeSave: false });
    await Blog.create(posts ,{ validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await Config.deleteMany();
    await HeroSection.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await DealOfWeek.deleteMany();
    await Blog.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
