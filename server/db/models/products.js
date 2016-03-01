'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var productSchema = new mongoose.Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	img: {type: String} //how will we serve this image up? 
});


mongoose.model('Product', schema);
