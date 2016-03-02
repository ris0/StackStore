'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    },
    price: {
        type: Number,
        required: true
    },
    image: String

});

mongoose.model('Product', productSchema);
