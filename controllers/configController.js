const Config = require('./../models/configModel');
const factory = require('./handlerFactory');


exports.getConfigOption = factory.getAll(Config);
exports.updateConfigOption = factory.updateOne(Config);

