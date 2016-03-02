var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var chai = require('chai');
chai.should();
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');

describe('Review model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Review).to.be.a('function');
    });


    describe('Validations', function() {

        var review;
        beforeEach(function() {
            review = new Review();
        });

        it('errors without content', function(done) {
            review.validate(function (err) {
                expect(err).to.not.equal(undefined);
                err.errors.content.should.be.an('object');
                done();
            });
        });

        it('errors when content is below minimum length', function(done) {
            review.content = "foo";
            review.validate(function (err) {
                err.errors.content.should.be.an('object');
                done();
            });
        });

    });

});

