var app = require('../../../server/app/index.js');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var expect = require('chai').expect;
var supertest = require('supertest');
var agent = supertest.agent(app);
var fs = require('fs');


describe('/api/products', function () {

	before(function (done){
		return mongoose.model('Product')
		.remove()
		.then(function(){
			done()
		})
		.then(null, function(err){
			done(err);
		});
	});

    describe('product', function () {

        var product;

        beforeEach(function (done) {
            Product.create({
                title: 'Testy',
                category: 'Zombie',
                description: 'McTesterson',
                price: 100
            }).then(function(){
            	done()
            }).then(null, function(err){
            	done(err)
            });
        });

        it('GET all', function (done) {
            agent
                .get('/api/products')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body).to.be.instanceof(Array);
                    // length should equal the number of products
                    expect(res.body).to.have.length(1);
                    done();
                });
        });

        var createdProduct;
    // change schema definition
        it('POST one', function (done) {
            agent
                .post('/api/products')
                .send({
                    title: 'Golden Chainsaw',
                	category: 'Zombie',
                	description: 'Wao',
                	price: 300
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.title).to.equal('Golden Chainsaw');
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
        	var objectId = new mongoose.Schema.ObjectId;
        	console.log(JSON.stringify(objectId));
            agent
                .get('/api/products/' + new mongoose.Schema.ObjectId)
                .expect(404)
                .end(done);
        });

        it('PUT one', function (done) {
            agent
                .put('/api/products/' + createdProduct._id)
                .send({
                    title: 'Garlic'
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.title).to.equal('Garlic');
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
                    Product.findById(createdProduct._id, function (err, b) {
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
