'use strict';
var mongoose = require('mongoose');

// BROWSER API LocalStorage

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

schema.virtual("numUniqueProducts").get(function () {
    return this.contents.length;
})

schema.virtual("numAllProducts").get(function () {
    var quantity = 0;
    this.contents.forEach(function (element) {
        quantity += element.quantity;
    })
    return quantity;
})

schema.virtual("totalPrice").get(function () {
  var totalPrice = 0;
  this.contents.forEach(function (element) {
    totalPrice += element.quantity * element.product.price;
  })
  return totalPrice;
})

// order checkout route on submit, prices all set in stone

// no back end guest cart, put it on localstorage
// guest cart on localstorage
// if no req user, send back 401 so that the local storage knows to manipulate it

// mongoose pre-hook?
// if there is a req user, create a cart with a ref to User
// otherwise create a cart for the sessionId

mongoose.model('Cart', schema);