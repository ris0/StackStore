var app = require('../../../server/app/index.js');
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');
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
        var product1 = {
            quantity: 4,
            categories: ["zombie"], 
            title: "Egg", 
            description: "An Egg", 
            price: 30 
        };
        var product2 = { 
            quantity: 2,
            categories: ["nuclear"],
            title: "Chicken", 
            description: "A Chicken", 
            price: 10 
        };

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
            var prod = {
                quantity: 22,
                categories: ["wombat"], 
                title: "Doorknob", 
                description: "Opens Doors", 
                price: 100 
            };

            Product.create(prod)
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
            var prod = {
                quantity: 22,
                categories: ["wombat"], 
                title: "Doorknob", 
                description: "Opens Doors", 
                price: 100 
            };

            Product.create(prod)
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



// needs to be a presave hook for creating a new cart in the User Document???

        // var createdProduct;
    // // change schema definition
    //     it('POST one', function (done) {
    //         agent
    //             .post('/api/products')
    //             .send({
    //                 title: 'Golden Chainsaw',
    //               category: 'Zombie',
    //               description: 'Wao',
    //               price: 300
    //             })
    //             .expect(201)
    //             .end(function (err, res) {
    //                 if (err) return done(err);
    //                 expect(res.body.title).to.equal('Golden Chainsaw');
    //                 createdProduct = res.body;
    //                 done();
    //             });
    //     });

    //     it('GET one', function (done) {
    //         agent
    //             .get('/api/products/' + createdProduct._id)
    //             .expect(200)
    //             .end(function (err, res) {
    //                 if (err) return done(err);
    //                 expect(res.body.title).to.equal(createdProduct.title);
    //                 done();
    //             });
    //     });

    //     // error handling tested
    //     it('GET one that doesn\'t exist', function (done) {
    //       var objectId = new mongoose.Schema.ObjectId;
    //       console.log(JSON.stringify(objectId));
    //         agent
    //             .get('/api/products/' + new mongoose.Schema.ObjectId)
    //             .expect(404)
    //             .end(done);
    //     });

    //     it('PUT one', function (done) {
    //         agent
    //             .put('/api/products/' + createdProduct._id)
    //             .send({
    //                 title: 'Garlic'
    //             })
    //             .expect(200)
    //             .end(function (err, res) {
    //                 if (err) return done(err);
    //                 expect(res.body.title).to.equal('Garlic');
    //                 done();
    //             });
    //     });

    //     it('PUT one that doesn\'t exist', function (done) {
    //         agent
    //             .put('/api/products/123abcnotamongoid')
    //             .send({title: 'Attempt To Update Book Title'})
    //             .expect(404)
    //             .end(done);
    //     });

    //     it('DELETE one', function (done) {
    //         agent
    //             .delete('/api/products/' + createdProduct._id)
    //             .expect(204)
    //             .end(function (err, res) {
    //                 if (err) return done(err);
    //                 Product.findById(createdProduct._id, function (err, b) {
    //                     if (err) return done(err);
    //                     expect(b).to.be.null;
    //                     done();
    //                 });
    //             });
    //     });

    //     it('DELETE one that doesn\'t exist', function (done) {
    //         agent
    //             .delete('/api/products/123abcnotamongoid')
    //             .expect(404)
    //             .end(done);
    //     });

    //     // it('GET with query string filter', function (done) {
    //     //     agent
    //     //     // remember that in query strings %20 means a single whitespace character
    //     //         .get('/api/products?title=Best%20Book%20Ever')
    //     //         .expect(200)
    //     //         .end(function (err, res) {
    //     //             if (err) return done(err);
    //     //             expect(res.body).to.be.instanceof(Array);
    //     //             expect(res.body).to.have.length();
    //     //             done();
    //     //         });
    //     // });
    });
});
