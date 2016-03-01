var express = require('express');
var router = express.Router();
var _ = require('lodash');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
// definie reviewRouter later: routes plural... schema singular

router.param('productId', function (req, res, next, productId) {
    Product.findById(productId).exec()
        .then(function (product) {
            req.product = product;
            next();
        }) // 1st arg: success || 2nd: failure
        .then(null, function (err) {
            if (!err.status) err.status = '404';
            next(err);
        });
});

// /api/products - get all
router.get('/', function (req, res, next) {
    Product.find({}).then(products => res.json(products));
});

// potentially create a product? admin?
router.post('/', function (req, res, next) {
    Product.create( req.body ).then(product => res.status(201).json(product));
});

router.get('/:productId', function (req, res, next) {
    res.send(req.product)
});

router.put('/:productId', function (req, res, next) {
    _.merge(req.product, req.body);

    req.product.save()
        .then(newProduct => res.json(newProduct))
        .then(null, next);
});

router.delete('/:productId', function (req, res, next) {
    req.product.remove()
        .then(function () { res.status(204).end(); })
        .then(null, next);
});

// check with andrew to make certain that these routes will pass router.param!
// these are commented out to do manual tests
// router.use('/reviews', reviewRouter);
// router.use('/cart', cartRouter);

module.exports = router;
