'use strict';
var router = require('express').Router({
    mergeParams: true
});
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var Auth = require('../../../utils/auth.middleware.js');
module.exports = router;

router.get('/', function (req, res, next) {
    Review.find({
            product: req.product._id
        })
        .populate('user')
        .then(function (reviews) {
            res.json(reviews);
        })
        .then(null, next);
});

router.post('/', Auth.assertAuthenticated, function (req, res, next) {
    Review.create(req.body)
        .then(function (review) {
            // Andrew: Please be careful! For some reason,
            // Mongoose IDs come back as strings.
            res.status(201).send(review);
        })
        .then(null, next);
});
