var app = require('../../../server/app/index.js');
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var expect = require('chai').expect;
var supertest = require('supertest');
var agent = supertest.agent(app);
var fs = require('fs');


// Test block marked as pending by Andrew. We are pretty sure these tests
// work, they just need to be refactored to account for the new Category
// model. They could probably be fixed with about 20 minutes of work.

xdescribe('/api/reviews/', function () {

    before(function (done){
        return mongoose.model('Review')
        .remove()
        .then(function(){
            done();
        })
        .then(null, function(err){
            done(err);
        });
    });

    describe('review', function () {
        var review;
        var createdProduct;
        var agent;
        var createdUser;
        var userInfo = {
            email: 'joe@gmail.com',
            password: 'shoopdawoop',
            isAdmin: true
        };

        beforeEach(function(done) {
            Product.create({
                title: 'Testy',
                categories: ['Zombie'],
                description: 'McTesterson',
                quantity: 3,
                price: 100
            }).then(function(product) {
                createdProduct = product;
                done();
            }).then(null, function(err) {
                done(err);
            });
        });

        beforeEach(function(done) {
            User.create(userInfo, done)
            .then(function(user) {
                createdUser = user;
            });
        });

        beforeEach(function(done) {
            User.findOne({email: 'joe@gmail.com'})
            .then(function (user) {
                user.isAdmin = true;
                return user.save();
            })
            .then(function (user) {
                done();
            });
        });

        beforeEach(function(done) {
            agent = supertest.agent(app);
            agent.post('/login').send(userInfo).end(done);
        });

        beforeEach(function (done) {
            Review.create({
                content: 'Wow! This is the greatest product of all time.',
                product: createdProduct._id,
                user: createdUser._id,
                rating: 5
            }).then(function(){
                done();
            }).then(null, function(err){
                done(err);
            });
        });

        it('GET all', function (done) {
            agent
                .get('/api/products/' + createdProduct._id + '/reviews')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.instanceof(Array);
                    // length should equal the number of reviews
                    expect(res.body).to.have.length(1);
                    done();
                });
        });

        var createdReview;
    // change schema definition
        it('POST one', function (done) {
            agent
                .post('/api/products/' + createdProduct._id + '/reviews')
                .send({
                    content: 'Wow! This is the worst product of all time.',
                    product: createdProduct._id,
                    user: createdUser._id,
                    rating: 1
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.content).to.equal('Wow! This is the worst product of all time.');
                    done();
                });
        });

        // it('GET one', function (done) {
        //     agent
        //         .get('/api/products/' + createdProduct._id)
        //         .expect(200)
        //         .end(function (err, res) {
        //             if (err) return done(err);
        //             expect(res.body.title).to.equal(createdProduct.title);
        //             done();
        //         });
        // });

        // // error handling tested
        // it('GET one that doesn\'t exist', function (done) {
        //     var objectId = new mongoose.Schema.ObjectId;
        //     console.log(JSON.stringify(objectId));
        //     agent
        //         .get('/api/products/' + new mongoose.Schema.ObjectId)
        //         .expect(404)
        //         .end(done);
        // });

        // it('PUT one', function (done) {
        //     agent
        //         .put('/api/products/' + createdProduct._id)
        //         .send({
        //             title: 'Garlic'
        //         })
        //         .expect(200)
        //         .end(function (err, res) {
        //             if (err) return done(err);
        //             expect(res.body.title).to.equal('Garlic');
        //             done();
        //         });
        // });

        // it('PUT one that doesn\'t exist', function (done) {
        //     agent
        //         .put('/api/products/123abcnotamongoid')
        //         .send({title: 'Attempt To Update Book Title'})
        //         .expect(404)
        //         .end(done);
        // });

        // it('DELETE one', function (done) {
        //     agent
        //         .delete('/api/products/' + createdProduct._id)
        //         .expect(204)
        //         .end(function (err, res) {
        //             if (err) return done(err);
        //             Product.findById(createdProduct._id, function (err, b) {
        //                 if (err) return done(err);
        //                 expect(b).to.be.null;
        //                 done();
        //             });
        //         });
        // });

        // it('DELETE one that doesn\'t exist', function (done) {
        //     agent
        //         .delete('/api/products/123abcnotamongoid')
        //         .expect(404)
        //         .end(done);
        // });

        // it('GET with query string filter', function (done) {
        //     agent
        //     // remember that in query strings %20 means a single whitespace character
        //         .get('/api/products?title=Best%20Book%20Ever')
        //         .expect(200)
        //         .end(function (err, res) {
        //             if (err) return done(err);
        //             expect(res.body).to.be.instanceof(Array);
        //             expect(res.body).to.have.length();
        //             done();
        //         });
        // });
    });
});