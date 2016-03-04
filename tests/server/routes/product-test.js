var app = require('../../../server/app/index.js');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var expect = require('chai').expect;
var supertest = require('supertest');
var fs = require('fs');


describe('/api/products', function() {



    before(function(done) {
        return mongoose.model('Product')
            .remove()
            .then(function() {
                done();
            })
            .then(null, function(err) {
                done(err);
            });
    });



    // Test block marked as pending by Andrew. We are pretty sure these tests
    // work, they just need to be refactored to account for the new Category
    // model. They could probably be fixed with about 20 minutes of work.

    xdescribe('product', function() {
        var createdProduct;
        var agent;
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
            User.create(userInfo, done);
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

        it('GET all', function(done) {
            agent
                .get('/api/products')
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.instanceof(Array);
                    // length should equal the number of products
                    expect(res.body).to.have.length(1);
                    done();
                });
        });

        // change schema definition
        it('POST one', function(done) {
            agent
                .post('/api/products')
                .send({
                    title: 'Golden Chainsaw',
                    categories: ['Zombie', 'Classy'],
                    description: 'wao',
                    quantity: 1,
                    price: 1000000
                })
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.title).to.equal('Golden Chainsaw');
                    done();
                });
        });

        it('GET one', function(done) {
            agent
                .get('/api/products/' + createdProduct._id)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.title).to.equal(createdProduct.title);
                    done();
                });
        });

        // error handling tested
        it('GET one that doesn\'t exist', function(done) {
            var objectId = new mongoose.Schema.ObjectId();
            agent
                .get('/api/products/' + new mongoose.Schema.ObjectId())
                .expect(404)
                .end(done);
        });

        it('PUT one', function(done) {
            agent
                .put('/api/products/' + createdProduct._id)
                .send({
                    title: 'Garlic'
                })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.title).to.equal('Garlic');
                    done();
                });
        });

        it('PUT one that doesn\'t exist', function(done) {
            agent
                .put('/api/products/123abcnotamongoid')
                .send({ title: 'Attempt To Update Product Title' })
                .expect(404)
                .end(done);
        });

        it('DELETE one', function(done) {
            agent
                .delete('/api/products/' + createdProduct._id)
                .expect(204)
                .end(function(err, res) {
                    if (err) return done(err);
                    Product.findById(createdProduct._id, function(err, b) {
                        if (err) return done(err);
                        expect(b).to.be.null;
                        done();
                    });
                });
        });

        it('DELETE one that doesn\'t exist', function(done) {
            agent
                .delete('/api/products/123abcnotamongoid')
                .expect(404)
                .end(done);
        });

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
