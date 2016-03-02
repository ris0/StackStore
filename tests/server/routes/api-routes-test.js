var app = require('../../../server/start.js');
var models = require('../../../server/db/models'),
    Product = models.Product,
    Review = models.Review,
    User = models.User,
    Cart = models.Cart;
var expect = require('chai').expect;
var supertest = require('supertest');
var agent = supertest.agent(app);
var fs = require('fs');

// Andrew: These tests are pending until they've been tailored to StackStore
xdescribe('testing /api routes', function () {

    function dropAll () {
        return Product.remove({})
            .then(function () {
                return Product.remove({});
            })
            .then(function () {
                return Product.remove({});
            });
    }

    before(function () {
        return dropAll();
    });

    after(function () {
        return dropAll();
    });

    it('handles internal server errors', function (done) {
        // in an actual application, this route wouldn't exist
        // it's here just to test how you handle errors in an express app
        agent
            .get('/broken')
            .expect(500, done);
    });

    it('handles custom errors', function (done) {
        // in an actual application, this route wouldn't exist
        // it's here just to test how you handle errors in an express app
        agent
            .get('/forbidden')
            .expect(403, done);
    });

    describe('/api', function () {

        describe('product', function () {

            var product;

            before(function (done) {
                Product.create({
                    title: 'Testy',
                    description: 'McTesterson',
                    price: 100
                }, function (err, a) {
                    if (err) return done(err);
                    author = a;
                    done();
                });
            });
            // add more model/schemas if desired
            //before(function (done) {
            //    Review.create({
            //        title: 'First',
            //        text: 'Once upon a time, the end.',
            //        number: 1
            //    }, function (err, c) {
            //        if (err) return done(err);
            //        chapter = c;
            //        done();
            //    });
            //});

            //before(function (done) {
            //    Book.create([{
            //        title: 'Best Book Ever',
            //        author: author,
            //        chapters: [chapter]
            //    }, {
            //        title: 'Worst Book Ever',
            //        author: author
            //    }], function (err, b) {
            //        if (err) return done(err);
            //        book = b;
            //        done();
            //    });
            //});

            it('GET all', function (done) {
                agent
                    .get('/api/products')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        expect(res.body).to.be.instanceof(Array);
                        // length should equal the number of products
                        expect(res.body).to.have.length();
                        done();
                    });
            });

            var createdProduct;
        // change schema definition
            it('POST one', function (done) {
                agent
                    .post('/api/products')
                    .send({
                        title: 'Book Made By Test',
                        author: author._id,
                        chapters: [chapter._id]
                    })
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        expect(res.body.title).to.equal('Book Made By Test');
                        createdProduct = res.body;
                        done();
                    });
            });

            it('GET one', function (done) {
                agent
                    .get('/api/products/' + createdProduct._id)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        expect(res.body.title).to.equal(createdProduct.title);
                        done();
                    });
            });

            // error handling tested
            it('GET one that doesn\'t exist', function (done) {
                agent
                    .get('/api/products/123abcnotamongoid')
                    .expect(404)
                    .end(done);
            });

            it('PUT one', function (done) {
                agent
                    .put('/api/products/' + createdProduct._id)
                    .send({
                        title: 'New Product'
                    })
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        expect(res.body.title).to.equal('New Product');
                        done();
                    });
            });

            it('PUT one that doesn\'t exist', function (done) {
                agent
                    .put('/api/products/123abcnotamongoid')
                    .send({title: 'Attempt To Update ProductTitle'})
                    .expect(404)
                    .end(done);
            });

            it('DELETE one', function (done) {
                agent
                    .delete('/api/products/' + createdProduct._id)
                    .expect(204)
                    .end(function (err, res) {
                        if (err) return done(err);
                        Book.findById(createdProduct._id, function (err, b) {
                            if (err) return done(err);
                            expect(b).to.be.null;
                            done();
                        });
                    });
            });

            it('DELETE one that doesn\'t exist', function (done) {
                agent
                    .delete('/api/products/123abcnotamongoid')
                    .expect(404)
                    .end(done);
            });

            it('GET with query string filter', function (done) {
                agent
                // remember that in query strings %20 means a single whitespace character
                    .get('/api/products?title=Best%20Book%20Ever')
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        expect(res.body).to.be.instanceof(Array);
                        expect(res.body).to.have.length();
                        done();
                    });
            });
        });
    });
});
