'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model.Review;
module.exports = router;

router.get('/:productId', function (req, res, next) {
    Review.find({ 'product': req.product._id })
    .then(res.json)
    .then(null, next);
});

router.post('/:productId', function (req, res, next) {
    Review.create({ req.body })
    .then(res.status(201).json)
    .then(null, next);
});