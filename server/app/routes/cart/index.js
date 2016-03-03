'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;

var Cart = mongoose.model('Cart');

router.use('/', function (req, res, next) {
    if (req.user) next();
    else res.sendStatus(401);
})


router.get('/current', function (req, res) {
    Cart.findOne({ user : req.user._id, pending : true })
    .then(function (oneCart) {
        res.json(oneCart);
    })
})

router.get('/past', function (req, res) {
    Cart.findOne({ user : req.user._id, pending : false })
    .then(function (carts) {
        res.json(carts);
    })
})

router.get('/all', function (req, res) {
    Cart.find({})
    .then(function (allCarts) {
        res.json()
    })
})

router.get('/:cartId', function (req, res) {
    Cart.findById(req.params.cartId)
    .then(function (foundCart) {
        res.json(foundCart);
    })
})

router.post('/', function (req, res) {
    Cart.create({ user : req.user._id })
    .then(function (createdCart) {
        res.json(createdCart);
    })
})

router.post('/:prodId/:qty', function (req, res) {
    Cart.findOne({ user : req.user._id })
    .then(function (foundCart) {
        foundCart.contents.push({
            quantity: req.params.qty,
            product: req.params.productId
        });
        return foundCart.save();
    })
    .then(function (savedCart) {
        res.json(savedCart);
    })
})

router.put('/:prodId/:qty', function (req, res) {
    Cart.findOne({ user : req.user._id })
    .then(function (foundCart) {
        foundCart.contents.forEach(function (element, index, contents) {
            if (element.product._id === req.params.prodId) {
                if (req.qty === 0) contents.splice(index, 1);
                else element.quantity = req.params.qty;
            }
        })
        return foundCart.save()
    })
    .then(function (savedCart) {
        res.json(savedCart);
    })
})

router.delete('/:prodId', function (req, res) {
    Cart.findOne({ user : req.user._id })
    .then(function (foundCart) {
        for (var i = foundCart.contents.length - 1; i >= 0; i--) {
            if (foundCart.contents[i].product._id === req.params.prodId) {
                foundCart.contents.splice(i, 1)
            }
        }
        return foundCart.save();
    })
    .then(function (savedCart) {
        res.status(200).json(savedCart);
    })
})