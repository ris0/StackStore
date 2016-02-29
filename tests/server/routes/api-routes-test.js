var app = require('./app');
var models = require('./models'),
    Author = models.Author,
    Book = models.Book,
    Chapter = models.Chapter;
var expect = require('chai').expect;
var supertest = require('supertest');
var agent = supertest.agent(app);
var fs = require('fs');

describe('testing /api routes', function () {

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

    it('serves up static files on /files route', function (done) {
        agent
            .get('/files/index.html')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                fs.readFile(__dirname + '/public/static/index.html', function (err, contents) {
                    if (err) return done(err);
                    expect(res.text).to.equal(contents.toString());
                    done();
                });
            });
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
                    firstName: 'Testy',
                    lastName: 'McTesterson'
                }, function (err, a) {
                    if (err) return done(err);
                    author = a;
                    done();
                });
            });
            // add more model/schemas if desired
            //before(function (done) {
            //    Product.create({
            //        title: 'First',
            //        text: 'Once upon a time, the end.',
            //        number: 1
            //    }, function (err, c) {
            //        if (err) return done(err);
            //        chapter = c;
            //        done();
            //    });
            //});
            //
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
                        title: 'Book Updated By Test'
                    })
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        expect(res.body.title).to.equal('Book Updated By Test');
                        done();
                    });
            });

            it('PUT one that doesn\'t exist', function (done) {
                agent
                    .put('/api/products/123abcnotamongoid')
                    .send({title: 'Attempt To Update Book Title'})
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
        //   !! ** SKELETON FOR MORE TESTS IF NEEDED ** !!
        //    describe('chapters', function () {
        //
        //        var chapterBook;
        //
        //        before(function (done) {
        //            Book.findOne({}, function (err, b) {
        //                if (err) return done(err);
        //                chapterBook = b;
        //                done();
        //            });
        //        });
        //
        //        it('GET all', function (done) {
        //            agent
        //                .get('/api/products/' + chapterBook._id + '/chapters')
        //                .expect(200)
        //                .end(function (err, res) {
        //                    if (err) return done(err);
        //                    // this should be an array of *chapters* not products
        //                    expect(res.body).to.be.instanceof(Array);
        //                    done();
        //                });
        //        });
        //
        //        var createdChapter;
        //
        //        it('POST one', function (done) {
        //            // notice the addChapter method we've provided for the Book model
        //            // it is helpful here!
        //            agent
        //                .post('/api/products/' + chapterBook._id + '/chapters')
        //                .send({
        //                    title: 'Chapter Made By Test',
        //                    text: 'A chapter made by a test',
        //                    number: 11
        //                })
        //                .expect(201)
        //                .end(function (err, res) {
        //                    if (err) return done(err);
        //                    expect(res.body.title).to.equal('Chapter Made By Test');
        //                    createdChapter = res.body;
        //                    Book.findById(chapterBook._id, function (err, b) {
        //                        if (err) return done(err);
        //                        expect(b.chapters).to.contain(createdChapter._id);
        //                        Chapter.findById(createdChapter._id, function (err, c) {
        //                            if (err) return done(err);
        //                            expect(c).to.not.be.null;
        //                            done();
        //                        });
        //                    });
        //                });
        //        });
        //
        //        it('GET one', function (done) {
        //            var chapId = createdChapter._id;
        //            agent
        //                .get('/api/products/' + chapterBook._id + '/chapters/' + chapId)
        //                .expect(200)
        //                .end(function (err, res) {
        //                    if (err) return done(err);
        //                    expect(res.body._id).to.equal(chapId);
        //                    done();
        //                });
        //        });
        //
        //        it('GET one that doesn\'t exist', function (done) {
        //            agent
        //                .get('/api/products/' + chapterBook._id + '/chapters/123abcnotamongoid')
        //                .expect(404)
        //                .end(done);
        //        });
        //
        //        it('PUT one', function (done) {
        //            var chapId = createdChapter._id;
        //            agent
        //                .put('/api/products/' + chapterBook._id + '/chapters/' + chapId)
        //                .send({
        //                    title: 'Chapter Updated By Test'
        //                })
        //                .expect(200)
        //                .end(function (err, res) {
        //                    if (err) return done(err);
        //                    expect(res.body.title).to.equal('Chapter Updated By Test');
        //                    done();
        //                });
        //        });
        //
        //        it('PUT one that doesn\'t exist', function (done) {
        //            agent
        //                .put('/api/products/' + chapterBook._id + '/chapters/123abcnotamongoid')
        //                .send({
        //                    title: 'Attempt To Update Chapter Title'
        //                })
        //                .expect(404)
        //                .end(done);
        //        });
        //
        //        it('DELETE one', function (done) {
        //            // notice the removeChapter method we've provided for the Book model
        //            // it is helpful here!
        //            var chapId = createdChapter._id;
        //            agent
        //                .delete('/api/products/' + chapterBook._id + '/chapters/' + chapId)
        //                .expect(204)
        //                .end(function (err, res) {
        //                    if (err) return done(err);
        //                    Chapter.findById(chapId, function (err, c) {
        //                        if (err) return done(err);
        //                        expect(c).to.be.null;
        //                        Book.findById(chapterBook._id, function (err, b) {
        //                            if (err) return done(err);
        //                            expect(b.chapters).to.not.contain(chapId);
        //                            done();
        //                        });
        //                    });
        //                });
        //        });
        //
        //        it('DELETE one that doesn\'t exist', function (done) {
        //            agent
        //                .delete('/api/products/' + chapterBook._id + '/chapters/123abcnotamongoid')
        //                .expect(404)
        //                .end(done);
        //        });
        //
        //    });
        //
        //});

    });

});
