var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var sinon = require('sinon');
var chai = require('chai');
chai.should();
var expect = require('chai').expect;
var mongoose = require('mongoose');
require('../../../server/db/models');
// Require in all models.
var Product = mongoose.model('Product');
describe('Product model', function () {
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });
    afterEach('Clear test database', function (done) {
        clearDB(done);
    });
    it('should exist', function () {
        expect(Product).to.be.a('function');
    });
});