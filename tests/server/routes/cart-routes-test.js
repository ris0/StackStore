var app = require('../../../server/app/index.js');
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');
var Category = mongoose.model('Category');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var expect = require('chai').expect;
var supertest = require('supertest');
var agent = supertest.agent(app);
var fs = require('fs');


describe('Cart Routes', function () {

    describe('/api/cart', function () {
        var userInfo = {
            email: 'joe@gmail.com',
            password: 'shoopdawoop'
        };
        var cart;
        var product1;
        var product2;

        beforeEach('create product categories', function (done){
            Category.create( {name: "zombie"} )
            .then(function (category) {
                product1 = {
                quantity: 4,
                categories: [category._id], 
                title: "Egg", 
                description: "An Egg", 
                price: 30 
                };
                return Category.create( {name: "nuclear"} );
            }).then(function (category){
                product2 = { 
                    quantity: 2,
                    categories: [category._id],
                    title: "Chicken", 
                    description: "A Chicken", 
                    price: 10 
                };
                done();
            });

        });

        beforeEach('clear the Product, Cart, and User DBs', function (done) {
            var promiseArr = [ Product.remove({}), Cart.remove({}), User.remove({}) ]

            Promise.all(promiseArr)
            .then(function () {
                done();
            })
        })

        beforeEach('Create a user', function (done) {
            User.create(userInfo)
            .then(function (createdUser) {
                createdUser.isAdmin = true;
                return createdUser.save();
            })
            .then(function (createdUser) {
                done();
            })
        });

        beforeEach('Create loggedIn user agent and authenticate', function (done) {
            agent.post('/login').send(userInfo).end(done);
        });

        beforeEach(function (done) {
            var user = User.find({});
            var myProd1 = Product.create(product1);
            var myProd2 = Product.create(product2);

            Promise.all([ user, myProd1, myProd2 ])
            .then(function (promiseArray) {
                var promisedUser = promiseArray[0][0];
                var promisedProd1 = promiseArray[1];
                var promisedProd2 = promiseArray[2];
                return Cart.create({
                    user: promisedUser._id, 
                    contents: [{ quantity: 2, product: promisedProd1 }, { quantity: 4, product: promisedProd2 }],
                    pending: true  
                })
            })
            .then(function () {
                done()
            })
            .then(null, done);
        });

        it('GET current', function (done) {
            agent
                .get('/api/cart/current')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.contents).to.be.instanceof(Array);
                    expect(res.body.contents).to.have.length(2);
                    done();
                });
        });

        it('GET past', function (done) {
            Cart.find({})
            .then(function (array) {
                array[0].pending = false;
                return array[0].save()
            })
            .then(function (savedCart) {
            })
            agent
                .get('/api/cart/past')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.contents).to.be.instanceof(Array);
                    expect(res.body.contents).to.have.length(2);
                    expect(res.body.finalOrder).to.have.length(2);
                    done();
                });
        });

        it('GET all', function (done) {
            Cart.find({})
            .then(function (found) {
            })
            agent
                .get('/api/cart/')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.instanceof(Array);
                    expect(res.body).to.have.length(1);
                    done();
                });
        });

        it('POST a new cart', function (done) {
                agent
                    .post('/api/cart/')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        expect(res.body.contents).to.be.instanceof(Array);
                        expect(res.body.contents).to.have.length(0);
                        done();
                    });
        });  

        it('POST a product', function (done) {
 
            Product.create(product1)
            .then(function (createdProduct) {
                agent
                    .post('/api/cart/' + createdProduct._id + '/2')
                    .send(createdProduct)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        expect(res.body.contents).to.be.instanceof(Array);
                        expect(res.body.contents).to.have.length(3);
                        done();
                    });
            });
        });

        it('PUT updates a cart contents', function (done) {

            Product.create(product1)
            .then(function (createdProduct) {
                agent
                    .put('/api/cart/' + createdProduct._id + '/0')
                    .send(createdProduct)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        expect(res.body.contents).to.be.instanceof(Array);
                        expect(res.body.contents).to.have.length(2);
                        done();
                    });
            });
        });

        it('DELETE a specific product from contents', function (done) {
            Cart.find({})
            .then(function (array) {
                agent
                    .delete('/api/cart/' + array[0].contents[0].product)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        expect(res.body.contents).to.be.instanceof(Array);
                        expect(res.body.contents).to.have.length(1);
                        done();
                    });
            });
        });
    });
});
