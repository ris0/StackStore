'use strict';

var mongoose = require('mongoose');
var User = require('./user');
var Product = require('./product');

var schema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 15,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: User
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: Product
    }
});

mongoose.model('Review', schema);