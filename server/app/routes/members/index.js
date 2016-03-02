'use strict';
var router = require('express').Router();
var _ = require('lodash');
var HttpError = require('../utils/HttpError');
var User = require('../db/models/user.js');

module.exports = router;

router.post('/login', function (req, res, next) {
    User.findOne(req.body).exec()
        .then(function (user) {
            if (!user) throw HttpError(401);
            req.login(user, function () {
                res.json(user);
            });
        })
        .then(null, next);
});

router.post('/signup', function (req, res, next) {
    User.create(req.body)
        .then(function (user) {
            req.login(user, function () {
                res.status(201).json(user);
            });
        })
        .then(null, next);
});

router.get('/me', function (req, res, next) {
    res.json(req.user);
});

router.delete('/me', function (req, res, next) {
    req.logout();
    res.status(204).end();
});

router.use('/google', require('./google.oauth'));
router.use('/twitter', require('./facebook.oauth'));

module.exports = router;



var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

