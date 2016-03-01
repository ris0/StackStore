'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
	description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    image: String

});


module.exports = mongoose.model('Product', productSchema);
