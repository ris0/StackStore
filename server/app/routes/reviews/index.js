'use strict';
var router = require('express').Router({ mergeParams: true });
var mongoose = require('mongoose');
var Review = mongoose.model.Review;
module.exports = router;

router.get('/', function (req, res, next) {
    Review.find({ 'product': req.product._id })
    .then(res.json)
    .then(null, next);
});

router.post('/', function (req, res, next) {
    Review.create( req.body ).save()
    .then(res.status(201).json)
    .then(null, next);
});