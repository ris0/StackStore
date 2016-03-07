var express = require('express');
var router = express.Router();
var _ = require('lodash');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var reviewRouter = require('../reviews');
var Auth = require('../../../utils/auth.middleware.js');

router.param('productId', function (req, res, next, productId) {
    Product.findOne({
            _id: productId
        })
        .then(function (product) {
            req.product = product;
            next();
        })
        .then(null, function (err) {
            if (!err.status) err.status = '404';
            next(err);
        });
});

router.get('/', function (req, res, next) {
    Product.find(req.query)
        .then(products => res.json(products))
        .then(null, next);
});

router.post('/', Auth.assertAdmin, function (req, res, next) {
    Product.create(req.body)
        .then(function (product) {
            res.status(201).json(product);
        })
        .then(null, next);

});

router.get('/:productId', function (req, res, next) {
    Product.findOne({
            _id: req.params.productId
        })
        // .populate('categories')
        .then(function (foundProduct) {
            console.log("CATEGORIES", foundProduct.categories);
            res.json(foundProduct);
        });
    // res.json(req.product);
});

router.put('/:productId', Auth.assertAdmin, function (req, res, next) {
    _.merge(req.product, req.body);

    req.product.save()
        .then(newProduct => res.json(newProduct))
        .then(null, next);
});

router.delete('/:productId', Auth.assertAdmin, function (req, res, next) {
    req.product.remove()
        .then(function () {
            res.status(204).end();
        })
        .then(null, next);
});

router.use('/:productId/reviews', reviewRouter);

module.exports = router;
