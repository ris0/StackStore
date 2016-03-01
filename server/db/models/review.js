'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 15
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }
});

mongoose.model('Review', schema);