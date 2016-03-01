'use strict';
var mongoose = require('mongoose');
var Product = mongoose.model('Product');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    contents: {
        type: Array,
        default: []
    },
    pending: {
        type: Boolean,
        required: true,
        default: true
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
    var totalPrice = 0;
    this.contents.forEach(function (element) {
        totalPrice += element.quantity * element.product.price;
    })
    return totalPrice;
})

// this presave hook writes in the current price, setting it in stone for future reference
schema.pre("save", function (next) {
    var self = this;
    if (self.pending === false) {
        self.contents = self.contents.map(function (element) {
            Product.findById(element.product._id).exec()
            .then(function (foundProduct) {
                element.product.price = foundProduct.price;
            })
        })
    }
    next();
}

mongoose.model('Cart', schema);