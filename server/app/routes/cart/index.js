'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Auth = require('../../../utils/auth.middleware.js');
module.exports = router;

var Cart = mongoose.model('Cart');

// middleware that will redirect to localStorage
router.use('/', function (req, res, next) {
    if (req.user) next();
    else res.sendStatus(401);
})

// find the current cart
router.get('/current', Auth.assertAdminOrSelf, function (req, res) {
    Cart.findOne({ user : req.user._id, pending : true })
    .then(function (oneCart) {
        res.json(oneCart);
    })
})

// find the past orders
router.get('/past', Auth.assertAdminOrSelf, function (req, res) {
    Cart.findOne({ user : req.user._id, pending : false })
    .then(function (carts) {
        res.json(carts);
    })
})

// ADMIN get all carts
router.get('/all', Auth.assertAdmin, function (req, res) {
    Cart.find({})
    .then(function (allCarts) {
        res.json(allCarts)
    })
})

// ADMIN get card by cartId
router.get('/:cartId', Auth.assertAdmin, function (req, res) {
    Cart.findById(req.params.cartId)
    .then(function (foundCart) {
        res.json(foundCart);
    })
})


// creates a new cart for the active user
router.post('/', Auth.assertAdminOrSelf, function (req, res) {
    Cart.create({ user : req.user._id })
    .then(function (createdCart) {
        res.json(createdCart);
    })
})

// adds a product with quantity to the cart
router.post('/:prodId/:qty', Auth.assertAdminOrSelf, function (req, res) {
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

// updates a product with quantity to the cart
router.put('/:prodId/:qty', Auth.assertAdminOrSelf, function (req, res) {
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

// deletes a product from the cart
router.delete('/:prodId', Auth.assertAdminOrSelf, function (req, res) {
    Cart.findOne({ user : req.user._id })
    .then(function (foundCart) {
        foundCart.contents = foundCart.contents.filter(function (element) {
            return element.product.toString() !== req.params.prodId.toString();
        })
        return foundCart.save();
    })
    .then(function (savedCart) {
        res.status(200).json(savedCart);
    })
})