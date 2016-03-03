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
var Chance = require ('chance'),
    _ = require ('lodash'),
    mongoose = require('mongoose'),
    Promise = require('bluebird'),
    chalk = require('chalk'),
    connectToDb = require('./server/db'),
    User = mongoose.model('User'),
    Product = mongoose.model('Product'),
    Review = mongoose.model('Review');


var chance = new Chance();
var numUsers = 20;
var numReviews = 20;
// picks a unique email address => chance.email will generate a random e-mail;
var emails = chance.unique(chance.email, numUsers);

function randUser () {
    return new User({
        email: emails.pop(),
        password: chance.word(),
        isAdmin: false
    })
}

function randReview (allUsers, allProducts) {
    // randomly pick one from an array that is resolved in generateAll
    var user = chance.pick(allUsers);
    var product = chance.pick(allProducts);
    // returns a natural #
    var numPars = chance.natural({
        min: 3,
        max: 4
    });
    return new Review({
        content: chance.n(chance.paragraph, numPars),
        user: user,
        product: product,
        rating: chance.integer({ min: 1, max: 5 })
    });
}

// take note: I removed reviews from productsSchema...deal with it :)
function generateAll () {

    // arg1 = n; arg2 = fn => returns array of result; invokes the fn (n) times;
    var users = _.times(numUsers, randUser);

    users.push(new User({
        email: 'joe@fsa.com',
        password: '123',
        isAdmin: true
    }));
    users.push(new User({
        email: 'alves@fsa.com',
        password: '123',
        isAdmin: true
    }));

    var sampleProducts = [
        {
            title: 'Templar Knight Helmet',
            categories: ['Helmet', 'Armor'],
            description: 'Protect your head, Protect your mind, Protect yourself with this shiny helmet!',
            quantity: 1000,
            availability: true,
            price: 1000,
            image: "http://www.trueswords.com/images/prod/c/templar_knight_metal_helmet2_250.jpg"
        },
        {
            title: 'Katana',
            categories: ['Swords', 'Weapons'],
            description: 'Perfect for close range combat and keeping a small profile. Destroy your enemies with one blow',
            quantity: 1000,
            availability: true,
            price: 1000,
            image: "http://www.trueswords.com/images/prod/c/shinwa-blue-knight-damascus-katana-kz747ndz_250.jpg"
        },


        {
            title: 'Evil Spiked Mace',
            categories: ['Mace', 'Weapons'],
            description: 'Perfect for close range combat and keeping a small profile. Destroy your enemies with one blow',
            quantity: 1000,
            availability: true,
            price: 1000,
            image: "http://www.trueswords.com/images/prod/c/evil_spiked_mace_250.jpg"
        },

        {
            title: 'Tomahawk',
            categories: ['Axe', 'Weapons'],
            description: 'Perfect for close range combat and keeping a small profile. Destroy your enemies with one blow',
            quantity: 1000,
            availability: true,
            price: 1000,
            image: "http://www.trueswords.com/images/prod/c/cherokee-tomahawk-bone-handle-with-feathers-a06-xl1428_250.jpg"
        },

        {
            title: 'Machine Gun',
            categories: ['Guns', 'Weapons'],
            description: 'Choppa Choppa Choppa Choppa Choppa Choppa Choppa Choppa Choppa Choppa Choppa Choppa',
            quantity: 1000,
            availability: true,
            price: 1000,
            image: "http://period7team1.weebly.com/uploads/4/3/7/1/43719557/957153_orig.jpg"
        }
    ];

    return Product.create(sampleProducts)
        .then(function (products) {
            return _.times(numReviews, function () {
                return randReview(users, products);
            });
        })
        .then(function (reviews) {
            // concat reviews to users
            return users.concat(reviews);
        })
        .then(null, function(err) { if(err) console.log(err) });

}

function seed () {
    var docs = generateAll();
    return Promise.map(docs, function (doc) {
        // currently generated an error as Product.create already saves, could be avoided via new Product({})
        return doc.save();
    });
}

connectToDb.then(function () {
    User.find({}).then(function (users) {
        if (users.length === 0) {
            return seed();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).then(null, function (err) {
        console.error(err);
        process.kill(1);
    });
});
