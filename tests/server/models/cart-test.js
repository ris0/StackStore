'use strict';

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Cart = mongoose.model('Cart');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

describe('Cart Model', function () {
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Cart).to.be.a('function');
    });

    describe('virtuals', function () {
        var cart;
        var category1;
        var category2;

        beforeEach(function (done) {
            var promiseArr = [Product.remove({}), Cart.remove({})]
            Promise.all(promiseArr)
                .then(function () {
                    done();
                });
        });

        beforeEach(function (done) {

            Category.create({
                    name: 'zombie'
                })
                .then(function (category) {
                    category1 = category;
                    return Category.create({
                        name: 'nuclear'
                    });
                })
                .then(function (category) {
                    category2 = category;
                    done();
                });
        });

        beforeEach(function (done) {
            var user = new User();
            var product1 = {
                quantity: 4,
                categories: [category1._id],
                title: "Egg",
                description: "An Egg",
                price: 30
            };
            var product2 = {
                quantity: 2,
                categories: [category2._id],
                title: "Chicken",
                description: "A Chicken",
                price: 10
            };
            var createProd1 = Product.create(product1);
            var createProd2 = Product.create(product2);

            Promise.all([user, createProd1, createProd2])
                .then(function (array) {
                    var user = array[0];
                    var oneProd = array[1];
                    var twoProd = array[2];
                    return Cart.create({
                        user: user._id,
                        contents: [{
                            quantity: 2,
                            product: oneProd
                        }, {
                            quantity: 4,
                            product: twoProd
                        }],
                        pending: true
                    })
                })
                .then(function (createdCart) {
                    cart = createdCart;
                    done();
                }, done)
        });

        it('returns the amount of unique products in the cart', function () {
            expect(cart.numUniqueProducts).to.equal(2);
        });

        it('returns the amount of total products in the cart', function () {
            expect(cart.numAllProducts).to.equal(6);
        });

        it('returns total value of all items in the cart', function () {
            expect(cart.totalPrice).to.equal(100);
        });
    });

    describe('pre-save hook', function () {
        var cart;
        var category1;
        var category2;
        var product1;
        var product2;

        beforeEach(function (done) {
            var promiseArr = [Product.remove({}), Cart.remove({})]
            Promise.all(promiseArr)
                .then(function () {
                    done();
                })
        })

        beforeEach(function (done) {

            Category.create({
                    name: 'zombie'
                })
                .then(function (category) {
                    console.log("W000000000000T", category);
                    category1 = category;
                    return Category.create({
                        name: 'nuclear'
                    });
                })
                .then(function (category) {
                    category2 = category;
                    done();
                });
        });

        beforeEach(function (done) {
            var user = new User();
            product1 = {
                quantity: 4,
                categories: [category1._id],
                title: "Egg",
                description: "An Egg",
                price: 30
            };
            product2 = {
                quantity: 2,
                categories: [category2._id],
                title: "Chicken",
                description: "A Chicken",
                price: 10
            };
            var createProd1 = Product.create(product1);
            var createProd2 = Product.create(product2);

            Promise.all([user, createProd1, createProd2])
                .then(function (array) {
                    var user = array[0];
                    var oneProd = array[1];
                    var twoProd = array[2];
                    return Cart.create({
                        user: user._id,
                        contents: [{
                            quantity: 2,
                            product: oneProd
                        }, {
                            quantity: 4,
                            product: twoProd
                        }],
                        pending: true
                    })
                })
                .then(function (createdCart) {
                    cart = createdCart;
                    done();
                }, done)
        });

        beforeEach(function (done) {
            var user = new User();
            var product = Product.create(product1);
            var currentCart;

            Promise.all([user, product])
                .then(function (array) {
                    return Cart.create({
                        user: array[0]._id,
                        contents: [{
                            quantity: 2,
                            product: array[1]
                        }],
                        pending: true
                    })
                })
                .then(function (createdCart) {
                    currentCart = createdCart;
                    return Product.find({});
                })
                .then(function (foundProd) {
                    foundProd[0].price = 5000;
                    return foundProd[0].save()
                })
                .then(function (newProduct) {
                    return currentCart.save();
                })
                .then(function () {
                    done();
                })
                .then(null, done);
        });

        it('checks to see if presave hook works', function (done) {
            Cart.find({})
                .then(function (theCart) {
                    theCart[0].pending = false;
                    return theCart[0].save();
                })
                .then(function (savedCart) {
                    expect(savedCart.finalOrder[0].price).to.equal(5000);
                    done();
                })
                .then(null, done);
        });
    });
});
