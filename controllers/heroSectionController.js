const HeroSection = require('../models/heroSectionModel');
const factory = require('./handlerFactory');


exports.getHeroSection = factory.getAll(HeroSection);
exports.updateHeroSection = factory.updateOne(HeroSection);

