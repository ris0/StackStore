'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    categories: [
        {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
        }
    ],
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0
    },
    availability: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        required: true
    },
    image: String

});

productSchema.pre('save', function (next) {
    if (this.quantity === 0) this.availability = false;
    next();
});

mongoose.model('Product', productSchema);
