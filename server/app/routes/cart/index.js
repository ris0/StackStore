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
});

// find the current cart, with porducts populated
router.get('/current', Auth.assertAdminOrSelf, function (req, res, next) {
    Cart.findOne({ user : req.user._id, status : 'pending' })
    .populate('contents.product')
    .then(function (oneCart) {
        res.json(oneCart);
    })
    .then(null, next);
});

// find the past orders
router.get('/past', Auth.assertAdminOrSelf, function (req, res, next) {
    Cart.findOne({ user : req.user._id, status : 'completed' })
    .then(function (carts) {
        res.json(carts);
    })
    .then(null, next);
});

// ADMIN get all carts
router.get('/', Auth.assertAdmin, function (req, res, next) {
    Cart.find({})
    .then(function (allCarts) {
        res.json(allCarts);
    })
    .then(null, next);
});

// ADMIN get card by cartId
router.get('/:cartId', Auth.assertAdmin, function (req, res, next) {
    Cart.findById(req.params.cartId)
    .then(function (foundCart) {
        res.json(foundCart);
    })
    .then(null, next);
});

router.get('/wishlist', Auth.assertAdminOrSelf, function (req, res, next) {
    Cart.findOne({ user : req.user._id, status : 'wishlist' })
    .then(function (wishlist) {
        res.json(wishlist);
    })
    .then(null, next);
});

// creates a new cart for the active user
router.post('/', Auth.assertAdminOrSelf, function (req, res, next) {
    var found = false;

    Cart.find({ user : req.user._id })
    .then(function(cartsArr){
        cartsArr.forEach(function(cart){
            if(cart.status === 'pending'){
                found = true;
                console.log(cart.status)
                res.json(cart).end();
            }
        });
        if(!found) return Cart.create({ user : req.user._id })
    })
    .then(function (createdCart) {
        if(createdCart) res.status(201).json(createdCart);
    })
    .then(null, next);
});

// adds a product with quantity to the cart
router.post('/:prodId/:qty', Auth.assertAdminOrSelf, function (req, res, next) {
    Cart.findOne({ user : req.user._id, status : 'pending' })
    .then(function (foundCart) {
        var found = false;
        // if the product is already in there, update qty
        foundCart.contents.forEach(function (element) {
            if (element.product == req.params.prodId) {
                element.quantity += Number(req.params.qty);
                found = true;
            }
        })
        // else do normal
        if (!found) {
            foundCart.contents.push({
                quantity: req.params.qty,
                product: req.params.prodId
            });
        }
        return foundCart.save();
    })
    .then(function (savedCart) {
        res.json(savedCart);
    })
    .then(null, next);
});

router.put('/pending/:cartId/:status', Auth.assertAdminOrSelf, function (req, res, next) {
    Cart.findOne({ _id : req.params.cartId })
    .then(function (cart) {
        cart.status = req.params.status;
        console.log(req.params, cart.status);
        return cart.save()
    })
    .then(function (savedCart) {
        res.json(savedCart);
    })
})

// updates a product with quantity to the cart
router.put('/:prodId/:qty', Auth.assertAdminOrSelf, function (req, res, next) {
    Cart.findOne({ user : req.user._id, status : 'pending' })
    .then(function (foundCart) {
        foundCart.contents.forEach(function (element, index, contents) {
            if (element.product.toString() === req.params.prodId.toString()) {
                if (req.params.qty === 0) contents.splice(index, 1);
                else element.quantity = req.params.qty;
            }
        });
        return foundCart.save();
    })
    .then(function (savedCart) {
        res.json(savedCart);
    })
    .then(null, next);
});

// deletes a product from the cart
router.delete('/clear-cart/:userId', Auth.assertAdminOrSelf, function (req, res, next) {
    Cart.findOne({ user : req.params.userId })
    .then(function (foundCart) {
        foundCart.contents.length = 0;
        return foundCart.save();
    })
    .then(function (savedCart) {
        res.status(204).json(savedCart);
    })
    .then(null, next);
});

router.delete('/:prodId', Auth.assertAdminOrSelf, function (req, res, next) {
    Cart.findOne({ user : req.user._id, status : 'pending' })
    .then(function (foundCart) {
        foundCart.contents = foundCart.contents.filter(function (element) {
            return element.product.toString() !== req.params.prodId.toString();
        });
        return foundCart.save();
    })
    .then(function (savedCart) {
        res.status(200).json(savedCart);
    })
    .then(null, next);
});
