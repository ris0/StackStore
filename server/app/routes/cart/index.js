'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;

var Cart = mongoose.model('Cart');

router.use('/', function (req, res, next) {
    console.log("WOOPWOOPWOOPWOOPWOOPWOOPWOOPWOOPWOOPWOOP\n", req.user)
    if (req.user) next();
    else res.sendStatus(401);
})

router.get('/:cartId', function (req, res) {
    Cart.findById(req.params.cartId)
    .then(function (foundCart) {
        res.status(200).json(foundCart);
    })
})

router.get('/current', function (req, res) {
    Cart.find({ user : req.user._id, pending : true })
    .then(function (oneCart) {
        res.status(200).json(oneCart);
    })
})

router.get('/past', function (req, res) {
    Cart.find({ user : req.user._id, pending : false })
    .then(function (carts) {
        res.status(200).json(carts);
    })
})

router.get('/all', function (req, res) {
    Cart.find({})
    .then(function (allCarts) {
        res.status(200).json()
    })
})

router.post('/', function (req, res) {
    Cart.findOne({ user : req.user._id })
    .then(function (foundCart) {
        foundCart.contents.push({
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return foundCart.save();
    })
    .then(function (savedCart) {
        res.status(200).json(savedCart);
    })
})

router.put('/', function (req, res) {
    Cart.findOne({ user : req.user._id })
    .then(function (foundCart) {
        foundCart.contents.forEach(function (element, index, contents) {
            if (element.product._id === req.body.productId) {
                if (req.body.quantity === 0) contents.splice(index, 1);
                else element.quantity = req.body.quantity;
            }
        })
        return foundCart.save()
    })
    .then(function (savedCart) {
        res.status(200).json(savedCart);
    })
})

router.delete('/', function (req, res) {
    Cart.findOne({ user : req.user._id })
    .then(function (foundCart) {
        for (var i = foundCart.contents.length - 1; i >= 0; i--) {
            if (foundCart.contents[i].product._id === req.body.productId) {
                foundCart.contents.splice(i, 1)
            }
        }
        return foundCart.save();
    })
    .then(function (savedCart) {
        res.status(200).json(savedCart);
    })
})