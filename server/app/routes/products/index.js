var express = require('express');
var router = express.Router();
var _ = require('lodash');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var reviewRouter = require('../reviews');

router.param('productId', function (req, res, next, productId) {
    Product.findOne({_id:productId})
        .then(function (product) {
            req.product = product;
            console.log(req.product);
            next();
        })
        .then(null, function (err) {
            if(!err.status) err.status = '404';
            next(err);
        });
});

router.get('/', function (req, res, next) {
    Product.find({}).then(products => res.json(products));
});

router.post('/', function (req, res, next) {
    Product.create( req.body ).then(product => res.status(201).json(product));
});

router.get('/:productId', function (req, res, next) {
    res.json(req.product)
});

router.put('/:productId', function (req, res, next) {
    _.merge(req.product, req.body);

    req.product.save()
        .then(newProduct => res.json(newProduct))
        .then(null, next);
});

router.delete('/:productId', function (req, res, next) {
    req.product.remove()
        .then(function () {
            res.status(204).end();
        })
        .then(null, next);
});

router.use('/:productId/reviews', reviewRouter);

module.exports = router;
