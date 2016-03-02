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

productSchema.pre('save', function (next) {
    if (this.quantity === 0) this.availability = false;
    next();
});

//lets delete this, yeah?

// productSchema.methods.addCategory = function (category) {
//     this.categories.push(category);
// };

// productSchema.methods.removeCategory = function (category) {
//     this.categories = this.categories.filter(function (element) {
//         return element !== category;
//     });
// };

mongoose.model('Product', productSchema);
