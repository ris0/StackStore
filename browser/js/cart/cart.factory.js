app.factory('CartFactory', function ($http, LocalStorageFactory) {

    var CartFactory = {};

    CartFactory.getAllCarts = function () {
        return $http.get('/api/cart')
            .then(carts => carts.data)
            .catch(function (err) {
                console.error(err);
            });
    };

    CartFactory.getCurrentCart = function () {
        if (window.useLocalStorage) {
            return LocalStorageFactory.getCurrentCart();
        }
        else {
            return $http.get('/api/cart/current')
                .then(cart => cart.data)
                .catch(function (err) {
                    console.error(err);
                });
        }
    };

    // CartFactory.getWishlist = function () {
    //     return $http.get('/api/cart/wishlist')
    //         .then(wishlist => wishlist.data)
    //         .catch(function (err) {
    //             console.error(err);
    //         });
    //     }
    // };

    CartFactory.getPastCarts = function (data) {
        return $http.get('/api/cart/past', data)
            .then(carts => carts.data)
            .catch(function (err) {
                console.error(err);
            });
    };

    CartFactory.getCartById = function (cartId) {
        return $http.get('/api/cart/' + cartId)
            .then(cart => cart.data)
            .catch(function (err) {
                console.error(err);
            });
    };

    CartFactory.createCart = function () {
        return $http.post('/api/cart')
            .then(cart => cart.data)
            .catch(function (err) {
                console.error(err);
            });
    };

    CartFactory.addProduct = function (productId, quantity, data) {
        if (window.useLocalStorage) {
            return LocalStorageFactory.addProduct(productId, quantity);
        }
        else {
            return $http.post('/api/cart/' + productId + '/' + quantity, data)
                .then(cart => cart.data)
                .catch(function (err) {
                    console.error(err);
                });
        }
    };

    CartFactory.updateProduct = function (productId, quantity, data) {
        if (window.useLocalStorage) {
            return LocalStorageFactory.updateProduct(productId, quantity);
        }
        else {
            return $http.put('/api/cart/' + productId + '/' + quantity, data)
                .then(cart => cart.data)
                .catch(function (err) {
                    console.error(err);
                });
        }
    };

    CartFactory.clearCurrentCart = function (userId) {
        return $http.delete('/api/cart/clear-cart/' + userId)
            .then(null, function (err) {
                console.error(err);
            });
    };

    CartFactory.deleteProduct = function (productId) {
        if (window.useLocalStorage) {
            return LocalStorageFactory.deleteProduct(productId);
        }
        else {
        return $http.delete('/api/cart/' + productId)
                .then(cart => cart.data)
                .catch(function (err) {
                    console.error(err);
                });
        }
    };

    CartFactory.checkout = function (cartId, bool) {
        if (window.useLocalStorage) {
            return LocalStorageFactory.checkout();
        }
        else {
            return $http.put('api/cart/pending/' + cartId + '/' + bool)
            .then(function (cart) {
                return cart.data;
            })
            .then(function (cartData) {
                CartFactory.createCart();
                return cartData;
            })
            .catch(function (err) {
                console.error(err);
            })
        }
    }

    return CartFactory;

});
