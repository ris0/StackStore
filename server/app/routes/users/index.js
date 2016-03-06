'use strict';

var router = require('express').Router(),
	_ = require('lodash');

var mongoose = require('mongoose');

var HttpError = require('../../../utils/HttpError.js');
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var Auth = require('../../../utils/auth.middleware.js');

router.param('id', function (req, res, next, id) {
	User.findById(id).exec()
	.then(function (user) {
		if (!user) throw HttpError(404);
		req.requestedUser = user;
		next();
	})
	.then(null, next);
});

router.get('/', Auth.assertAdmin, function (req, res, next) {
	User.find({}).exec()
	.then(function (users) {
		res.json(users);
	})
	.then(null, next);
});

router.post('/', function (req, res, next) {
	User.create(req.body)
	.then(function (user) {
		console.log(user);
		res.status(201).json(user);
	})
	.then(null, next);
});

router.get('/:id', Auth.assertAdminOrSelf, function (req, res, next) {

	// For Rich and Jai: Do you guys like this output?

	Cart.find( { user: req.requestedUser._id, pending: false })
	.then(function (carts) {
		req.requestedUser.pastOrders = carts;
		res.json(req.requestedUser);
	})
	.then(null, next);

	// For Rich and Jai: We only provide a route for getting back all orders.
	// We believe that there shouldn't be a dedicated route for getting back
	// a single order, but let's talk about this at peer review

});



router.put('/:id', Auth.assertAdminOrSelf, function (req, res, next) {
	if (Auth.isSelf(req)) delete req.body.isAdmin;
	_.extend(req.requestedUser, req.body);
	req.requestedUser.save()
	.then(function (user) {
		res.json(user);
	})
	.then(null, next);
});

router.delete('/:id', Auth.assertAdminOrSelf, function (req, res, next) {
	req.requestedUser.remove()
	.then(function () {
		res.status(204).end();
	})
	.then(null, next);
});

module.exports = router;