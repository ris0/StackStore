'use strict';
var mongoose = require('mongoose');


exports.clearDb = function () {
    return mongoose.model('Product').remove().exec();
};

exports.clearMongoose = function () {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
};
