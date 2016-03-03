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
        var product1 = { 
            title: "Egg", 
            category: "Apoc1", 
            description: "An Egg", 
            price: 30 
        };
        var product2 = { 
            title: "Chicken", 
            category: "Apoc2", 
            description: "A Chicken", 
            price: 10 
        };

        beforeEach(function (done) {
            var promiseArr = [ Product.remove({}), Cart.remove({}) ]
            Promise.all(promiseArr)
            .then(function () {
                done();
            })
        })

        beforeEach(function (done){
            var user = new User();
            var createProd1 = Product.create(product1);
            var createProd2 = Product.create(product2);

            Promise.all([ user, createProd1, createProd2 ])
            .then(function (array) {
                var user = array[0];
                var oneProd = array[1];
                var twoProd = array[2];
            return Cart.create({ 
                user: user._id, 
                contents: [{ quantity: 2, product: oneProd }, { quantity: 4, product: twoProd }],
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
        var myProd = { 
            title: "Egg", 
            category: "Apoc1", 
            description: "An Egg", 
            price: 30 
        }

        beforeEach(function (done) {
            var promiseArr = [ Product.remove({}), Cart.remove({}) ]
            Promise.all(promiseArr)
            .then(function () {
                done();
            })
        })

        beforeEach(function (done) {
            var user = new User();
            var product = Product.create(myProd);
            var currentCart;

            Promise.all([ user, product ])
            .then(function (array) {
                return Cart.create({
                    user: array[0]._id,
                    contents: [{ quantity: 2, product: array[1] }],
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
                return theCart[0].save()
            })
            .then(function (savedCart) {
                expect(savedCart.finalOrder[0].price).to.equal(5000);
                done();
            })
            .then(null, done)
        })
    });

});
