app.factory('LocalStorageFactory', function ($http) {

    var LocalStorageFactory = {};

    LocalStorageFactory.getCurrentCart = function () {
        return JSON.parse(window.localStorage.cart)
    };

    LocalStorageFactory.addProduct = function (productId, quantity, data) {
        $http.get('api/products/' + productId)
        .then(function (product) {
            var obj = {
                quantity : quantity,
                product : product.data
            }
            var JSONcart = JSON.parse(window.localStorage.cart)
            JSONcart.contents.push(obj);
            // console.log(JSON.stringify(product));
            return window.localStorage.setItem("cart", JSON.stringify(JSONcart));
        })
    };

    LocalStorageFactory.updateProduct = function (productId, quantity, data) {
        var JSONcart = JSON.parse(window.localStorage.cart);
        JSONcart.contents.forEach(function (element) {
            console.log("Quantity Changed!")
            if (element.product._id === productId) element.quantity = quantity;
        })
        return window.localStorage.setItem("cart", JSON.stringify(JSONcart)); 
    };

    LocalStorageFactory.deleteProduct = function (productId) {
        var JSONcart = JSON.parse(window.localStorage.cart);
        JSONcart.contents.forEach(function (element, index) {
            console.log("Item Deleted!")
            if (element.product._id === productId) JSONcart.contents.splice(index, 1);
        })
        window.localStorage.setItem("cart", JSON.stringify(JSONcart)); 
        return JSON.parse(window.localStorage.cart);
    };

    // LocalStorageFactory.checkout = function (cartId, bool) {
    //     return $http.put('api/cart/pending/' + cartId + '/' + bool)
    //     .then(function (cart) {
    //         return cart.data;
    //     })
    //     .then(function (cartData) {
    //         LocalStorageFactory.createCart();
    //         return cartData;
    //     })
    //     .catch(function (err) {
    //         console.error(err);
    //     })
    // }

    return LocalStorageFactory;

});
