'use strict';
var mongoose = require('mongoose'),
    helper = require('./helper'),
    expect = require('chai').expect,
    Promise = require('bluebird'),
    models = require('../models');

var Product = models('Product');

// TODO: Make certain to implement changes to variable declarations to specify the model that we are working with

describe('product', function () {

    //clear the database before the tests
    before(function(done) {
        helper.clearDb().then(function() {
            done();
        }, done);
    });

    // erase all tasks after each spec
    afterEach(function(){
        return Product.remove();
    });

    // reset after all the tests (for use with mocha --watch)
    after(function(){
        helper.clearMongoose();
    });

    // TODO: define tests that are appropriate for our project
    describe('Virtuals', function() {

        //describe('timeRemaining', function() {
        //
        //    it('returns the Infinity value if task has no due date', function() {
        //        var task = new Task();
        //        expect(task.timeRemaining).to.equal(Infinity);
        //    });
        //
        //    it('returns the difference between due date and now', function() {
        //        var oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
        //
        //        // create a task due one day from this point in time
        //        var task = new Task({
        //            due: helper.dates.tomorrow()
        //        });
        //
        //        expect(task.timeRemaining).to.be.closeTo(oneDay, 10); // within 10 ms
        //    });
        //
        //});
        //
        //describe('overdue', function() {
        //
        //    it('is overdue if the due date is in the past', function() {
        //        var task = new Task({
        //            due: helper.dates.yesterday()
        //        });
        //        expect(task.overdue).to.be.true;
        //    });
        //
        //    it('is not overdue if the due date is in the past but complete is true', function() {
        //        var task = new Task({
        //            due: helper.dates.yesterday(),
        //            complete: true
        //        });
        //        expect(task.overdue).to.be.false;
        //    });
        //
        //    it('is not overdue if the due date is in the future', function() {
        //        var task = new Task({
        //            due: helper.dates.tomorrow()
        //        });
        //        expect(task.overdue).to.be.false;
        //    });
        //});
    });

    // TODO: define tests that are appropriate for our project
    describe('statics', function(){

        //beforeEach(function(){
        //    return Promise.all([
        //        Task.create({ name: 't1', due: helper.dates.tomorrow() }),
        //        Task.create({ name: 't2', due: helper.dates.tomorrow(), complete: true }),
        //        Task.create({ name: 't3', due: helper.dates.yesterday() }),
        //        Task.create({ name: 't4', due: helper.dates.yesterday(), complete: true })
        //    ]);
        //});
        //
        //afterEach(function(){
        //    return Task.remove(); // erases all tasks
        //});
        //
        //describe('clearCompleted', function(){
        //
        //    it('removes all completed tasks from the database', function(done){
        //        Task.clearCompleted()
        //            .then(function(){
        //                return Task.find().exec();
        //            })
        //            .then(function(tasks){
        //                expect(tasks).to.have.length(2);
        //                tasks.forEach(function(task){
        //                    expect(task.complete).to.be.false;
        //                });
        //                done();
        //            })
        //            .then(null, done); // catch test errors
        //    });
        //
        //});
        //
        //describe('completeAll', function(){
        //
        //    it('marks all tasks in the database as complete', function(done){
        //        Task.completeAll()
        //            .then(function(){
        //                return Task.find().exec(); // checking actual tasks in database
        //            })
        //            .then(function(tasks){
        //                expect(tasks).to.have.length(4);
        //                console.log(tasks);
        //                tasks.forEach(function(task){
        //                    expect(task.complete).to.be.true;
        //                });
        //                done();
        //            })
        //            .then(null, done); // catch test errors
        //    });
        //
        //});

    });

    // TODO: define tests that are appropriate for our project
    describe('methods', function() {

        //var task;
        //
        //beforeEach(function(done) {
        //    task = new Task({
        //        name: 'task'
        //    });
        //    task.save(done);
        //});
        //
        //describe('addChild', function() {
        //
        //    it('should return a promise for a new task with the parent\'s id', function(done) {
        //        task.addChild({ name: 'task2' })
        //            .then(function(child) {
        //                expect(child.parent).to.equal(task._id);
        //                expect(child.name).to.equal('task2');
        //                done();
        //            })
        //            .then(null, done); //catch test errors
        //    });
        //
        //});
        //
        //describe('getChildren', function() {
        //
        //    beforeEach(function(done) {
        //        task.addChild({ name: 'foo' }).then(function() {
        //            done();
        //        }, done);
        //    });
        //
        //    it("should return a promise for an array of the task's children", function(done) {
        //        task.getChildren()
        //            .then(function(children) {
        //                expect(children).to.have.length(1);
        //                expect(children[0].name).to.equal('foo');
        //                done();
        //            })
        //            .then(null, done); //catch test errors
        //    });
        //
        //});
        //
        //describe('getSiblings', function() {
        //
        //    var childrenReferences = [];
        //
        //    var childBuilder = function(done) {
        //        task.addChild({ name: 'foo' }).then(function(child) {
        //            childrenReferences.push(child);
        //            done();
        //        }, done);
        //    };
        //
        //    //build two children
        //    beforeEach(childBuilder);
        //    beforeEach(childBuilder);
        //
        //    it('returns a promise for an array of siblings', function(done) {
        //        childrenReferences[0].getSiblings()
        //            .then(function(siblings) {
        //                expect(siblings).to.have.length(1);
        //                expect(siblings[0].id).to.equal(childrenReferences[1].id);
        //                done();
        //            })
        //            .then(null, done);
        //    });
        //
        //});

    });

    // TODO: define tests that are appropriate for our project
    describe('hooks', function(){

        //var studyTask;
        //beforeEach(function(){
        //    // make a parent `study` task
        //    studyTask = new Task({ name: 'study', due: helper.dates.yesterday() });
        //    return studyTask.save()
        //        .then(function(study){
        //            // make two child tasks (`mongo` and `express`) and two unrelated tasks
        //            return Promise.all([
        //                Task.create({
        //                    parent: study._id,
        //                    name: 'mongo',
        //                    due: helper.dates.yesterday(),
        //                    complete: true
        //                }),
        //                Task.create({
        //                    parent: study._id,
        //                    name: 'express',
        //                    due: helper.dates.tomorrow()
        //                }),
        //                Task.create({ name: 'sleep' }),
        //                Task.create({ name: 'eat' })
        //            ]);
        //        });
        //});

        // TODO: define tests that are appropriate for our project
        describe('removal', function(){

            //it('also removes all child tasks', function(done){
            //    studyTask.remove().then(function(){
            //        return Task.find().exec();
            //    }).then(function(tasks){
            //            expect(tasks).to.have.length(2);
            //            expect(tasks[0].name).to.equal('sleep');
            //            expect(tasks[1].name).to.equal('eat');
            //            done();
            //        })
            //        .then(null, done); // catch test errors
            //});

        });

    });

});
