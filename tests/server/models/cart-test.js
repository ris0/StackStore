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

// TODO: Make certain to implement changes to variable declarations to specify the model that we are working with

describe('Cart', function () {

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

    // TODO: define tests that are appropriate for our project
    describe('virtuals', function() {

        var cart;
        var product1 = { 
            _id: "8080", 
            title: "Egg", 
            category: "Apoc1", 
            description: "An Egg", 
            price: 30 
        };
        var product2 = { 
            _id: "1337", 
            title: "Chicken", 
            category: "Apoc2", 
            description: "A Chicken", 
            price: 10 
        };

        beforeEach(function(done){
            var user = new User();

            Cart.create({ 
                user: user._id, 
                contents: [{ quantity: 2, product: product1 }, { quantity: 4, product: product2 }],
                pending: true  
                })
            .then(function (createdCart) {
                cart = createdCart;
                done();
            }, done)
        });

        it('returns the amount of unique products in the cart', function() {
            expect(cart.numUniqueProducts).to.equal(2);
        });

        it('returns the amount of total products in the cart', function() {
            expect(cart.numAllProducts).to.equal(6);
        });

        it('returns total value of all items in the cart', function() {
            expect(cart.totalPrice).to.equal(100);
        });
    });

    // TODO: define tests that are appropriate for our project
    // describe('pre-save hook', function(){

    //     var cart;
    //     // need to write a Product dummy for testing purposes

    //     beforeEach(function(done){
    //        // make a parent `study` task
    //        var user = new User();

    //         cart = new Cart({
    //             user: user._id,
    //             quantity: 2, 
    //             product: { 
    //                 _id: "8080", 
    //                 title: "Egg", 
    //                 category: "Apoc1", 
    //                 description: "An Egg", 
    //                 price: 30 
    //             },
    //             pending: true
    //         })
    //         .then(function () {
    //             done();
    //         }, done 
    //     });

    //     it('checks to see if presave hook works', function (done) {
    //         cart.save()
    //         .then(function (savedCard) {



    //             // done()
    //         })
    //         .then(null, done)
    //     })
    // });

});
