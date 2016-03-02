/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var Chance = require ('chance')(),
    _ = require ('lodash'),
    mongoose = require('mongoose'),
    Promise = require('bluebird'),
    chalk = require('chalk'),
    connectToDb = require('./server/db'),
    User = require('./server/db/models/user.js'),
    Product = require('./server/db/models/user.js'),
    Review = require('./server/db/models/user.js');


// creating a new instance of chance and defining vars that will limit the amount of users/reviews generated
var chance = new Chance();
var numUsers = 20;
var numReviews = 20;
var emails = chance.unique(chance.email, numUsers);

function randUser () {
    return new User({
        email: emails.pop(),
        password: chance.word(),
        isAdmin: false
    });
};

function randReview (allUsers) {
    var user = chance.pick(allUsers);
    var numPars = chance.natural({
        min: 3,
        max: 20
    });
    return new Review({
        user: user,
        content: chance.n(chance.paragraph, numPars)
    });
}

function generateAll () {
    var users = _.times(numUsers, randUser);
    users.push(new User({
        email: 'david@fsa.com',
        password: '123',
        isAdmin: true
    }));
    users.push(new User({
        email: 'nimit@fsa.com',
        password: '123',
        isAdmin: true
    }));
    var reviews = _.times(numReviews, function () {
        return randReview(users);
    });
    return users.concat(reviews);
}

function seed () {
    var docs = generateAll();
    return Promise.map(docs, function (doc) {
        return doc.save();
    });
}

// likely to cause an error here
connectToDb.drop = Promise.promisify(connectToDb.db.dropDatabase.bind(connectToDb.db));

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
