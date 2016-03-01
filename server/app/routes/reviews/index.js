'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;

router.get('/reviews/:productId', function (req, res, next) {
    mongoose.model.Review.find({ 'product': req.product._id })
    .then(res.json)
    .then(null, next);
});

router.post('/reviews/:productId', function (req, res, next) {
    mongoose.model.Review.create({ req.body })
    .then(res.status(201).json)
    .then(null, next);
});