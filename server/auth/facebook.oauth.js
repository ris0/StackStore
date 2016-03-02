'use strict';

var router = require('express').Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
// TODO: NPM install passport-facebook?

var User = require('../db/models/user.js');
var secrets = require('../../secrets');

// TODO: Replace consumerKey/Secret, redirect to the correct URI
router.get('/', passport.authenticate('facebook'));

router.get('/callback', passport.authenticate('facebook', {
    successRedirect: '/stories',
    failureRedirect: '/signup'
}));

passport.use(new TwitterStrategy({
    consumerKey: 'xe86sGm0HUu7qTwnQBq89dX02',
    consumerSecret: secrets.facebook,
    callbackURL: 'http://127.0.0.1:8080/auth/facebook/callback'
}, function (token, refreshToken, profile, done) {
    User.findOne({'facebook.id': profile.id }, function (err, user) {
        if (err) done(err);
        else if (user) done(null, user);
        else {
            // facebook will not provide an email, so we'll just fake it
            var email = [profile.username , 'fake-auther-email.com'].join('@');
            User.create({
                email: email,
                photo: profile.photos[0].value,
                name: profile.displayName,
                facebook: {
                    id: profile.id,
                    name: profile.displayName,
                    email: email,
                    token: token
                }
            }, done);
        }
    });
}));

module.exports = router;
