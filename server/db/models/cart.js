'use strict';
var mongoose = require('mongoose');
// var Product = mongoose.model('Product');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    contents:
        [{
            quantity: Number,
            product: { type : String, ref: 'Product' }
        }],
    pending: {
        type: Boolean,
        default: true,
        required: true
    }
});

// finds the number of unique products in cart
schema.virtual("numUniqueProducts").get(function () {
    return this.contents.length;
})

// finds the number of total products in cart
schema.virtual("numAllProducts").get(function () {
    var quantity = 0;
    this.contents.forEach(function (element) {
        quantity += element.quantity;
    })
    return quantity;
})

// finds the total cost of cart
schema.virtual("totalPrice").get(function () {
    // QUESTION: do async stuff to get full price?
    var totalPrice = 0;
    this.contents.forEach(function (element) {
        totalPrice += element.quantity * element.product.price;
    })
    return totalPrice;
})

// this presave hook writes in the current product documents, setting it in stone for future reference
schema.pre("save", function (next) {
    var self = this;
    if (self.pending === false) {
        Promise.all(self.contents.map(function (element) {
            return Product.findById(element.product._id)
        }))
        .then(function (arrayProducts) {
            self.contents.forEach(function (element, index) {
                element.product = arrayProducts[index];
            })
            next();
        })
    }
    else {
        next();
    }
})

mongoose.model('Cart', schema);