'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 15,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
});

mongoose.model('Review', schema);
