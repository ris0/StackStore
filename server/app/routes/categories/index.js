'use strict';
var router = require('express').Router({
    mergeParams: true
});
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var _ = require('lodash');
var Auth = require('../../../utils/auth.middleware.js');
module.exports = router;

router.param('categoryId', function (req, res, next, categoryId) {
    Category.findOne({
            _id: categoryId
        })
        .then(function (category) {
            req.product = category;
            next();
        })
        .then(null, function (err) {
            if (!err.status) err.status = '404';
            next(err);
        });
});

router.get('/', function (req, res, next) {
    Category.find()
        .then(function (categories) {
            res.json(categories);
        })
        .then(null, next);
});

router.post('/', Auth.assertAdmin, function (req, res, next) {
    Category.create(req.body)
        .then(function (category) {
            res.status(201).send(category);
        })
        .then(null, next);
});

router.put('/:categoryId', Auth.assertAdmin, function (req, res, next) {
    _.merge(req.category, req.body);

    req.category.save()
        .then(newCategory => res.json(newCategory))
        .then(null, next);
});

router.delete('/:categoryId', Auth.assertAdmin, function (req, res, next) {
    req.category.remove()
        .then(function () {
            res.status(204).end();
        })
        .then(null, next);
});
