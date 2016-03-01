'use strict';
var router = require('express').Router();
module.exports = router;

var Cart = mongoose.model('Cart');
var Product = mongoose.model('Product');

router.use('/', function (req, res, next) {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
})

router.get('/', function (req, res) {
        Cart.findOne({ user : req.user.Id })
        .then(function (oneCart) {
            res.status(200).json(oneCart);
        })
})

router.get('/all', function (req, res) {
    Cart.find({}).exec()
    .then(function (allCarts) {
        res.status(200).json()
    })
})

router.post('/:productId', function (req, res) {
    Cart.findOne({ user : req.user.Id }).exec()
    .then(function (foundCart) {
        foundCart.contents.push({
            quantity: req.body.quantity,
            product: req.product
        });
        return foundCart.save();
    })
    .then(function (savedCart) {
        res.status(200).send(savedCart);
    })
})

router.put('/:productId', function (req, res) {
    Cart.findOne({ user : req.user.Id }).exec()
    .then(function (foundCart) {
        var productId = req.product._id;
        foundCart.contents.forEach(function (element) {
            if (element.product._id === productId) {
                element.quantity = req.body.quantity;
            }
        })
        return foundCart.save();
    })
    .then(function (savedCart) {
        res.status(200).send(savedCart);
    })
})

router.delete('/:productId', function (req, res) {
    Cart.findOne({ user : req.user.Id }).exec()
    .then(function (foundCart, foundProduct) {
        var productId = req.product._id;
        foundCart.contents.forEach(function (element, index, contents) {
            if (element.product._id === productId) {
                contents.splice(index, 1);
            }
        })
        return foundCart.save();
    })
    .then(function (savedCart) {
        res.status(200).send(savedCart);
    })
})