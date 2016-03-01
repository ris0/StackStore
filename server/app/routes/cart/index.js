'use strict';
var router = require('express').Router();
module.exports = router;

// CHANGE REQ / RES and use SINGLE QUOTES

// if there is no user, send back 401 response so frond end angular can manipulate it
// look for third part local storage library for angular
// use json stringify or json parse

// price must be stored in the cart as a ref until the order is completed, then the price is set in stone
var Cart = mongoose.model("Cart");
var Product = mongoose.model("Product");

router.use("/", function (request, response, next) {
    if (request.user) {
        next();
    }
    else {
        response.sendStatus(401);
    }
})

router.get("/", function (request, response) {
        Cart.findOne({ user : request.user.Id })
        .then(function (oneCart) {
            response.status(200).json(oneCart);
        })
})

router.get("/all", function (request, response) {
    Cart.find({}).exec()
    .then(function (allCarts) {
        response.status(200).json()
    })
})

router.post("/:productId", function (request, response) {
    Cart.findOne({ user : request.user.Id }).exec()
    .then(function (foundCart) {
        foundCart.contents.push({
            quantity: request.body.quantity,
            product: request.product
        });
        return foundCart.save();
    })
    .then(function (savedCart) {
        response.status(200).send(savedCart);
    })
})

router.put("/:productId", function (request, response) {
    Cart.findOne({ user : request.user.Id }).exec()
    .then(function (foundCart) {
        var productId = request.product._id;
        foundCart.contents.forEach(function (element) {
            if (element.product._id === productId) {
                element.quantity = request.body.quantity;
            }
        })
        return foundCart.save();
    })
    .then(function (savedCart) {
        response.status(200).send(savedCart);
    })
})

router.delete("/:productId", function (request, response) {
    Cart.findOne({ user : request.user.Id }).exec()
    .then(function (foundCart, foundProduct) {
        var productId = request.product._id;
        foundCart.contents.forEach(function (element, index, contents) {
            if (element.product._id === productId) {
                contents.splice(index, 1);
            }
        })
        return foundCart.save();
    })
    .then(function (savedCart) {
        response.status(200).send(savedCart);
    })
})