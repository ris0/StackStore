'use strict';
var mongoose = require('mongoose');


exports.clearDb = function () {
    return mongoose.model('Cart').remove().exec();
};

exports.clearMongoose = function () {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
};
