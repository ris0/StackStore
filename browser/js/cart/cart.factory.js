app.factory('CartFactory', function ($http) {

    var CartFactory = {};

    CartFactory.getAllCarts = function () {
        return $http.get('/api/cart')
            .then(carts => carts.data)
            .catch(function (err) {
                console.error(err);
            });
    };

    CartFactory.getCurrentCart = function (data) {
        return $http.get('/api/cart/current', data)
            .then(cart => cart.data)
            .catch(function (err) {
                console.error(err);
            });
    };

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

    CartFactory.createCart = function (data) {
        return $http.post('/api/cart', data)
            .then(cart => cart.data)
            .catch(function (err) {
                console.error(err);
            });
    };

    CartFactory.addProduct = function (productId, quantity, data) {
        return $http.post('/api/cart' + productId + '/' + quantity, data)
            .then(cart => cart.data)
            .catch(function (err) {
                console.error(err);
            });
    };

    CartFactory.updateProduct = function (productId, quantity, data) {
        return $http.put('/api/cart/' + productId + '/' + quantity, data)
            .then(cart => cart.data)
            .catch(function (err) {
                console.error(err);
            });
    };

    CartFactory.clearCurrentCart = function (userId) {
        return $http.delete('/api/cart/clear-cart/' + userId)
            .then(null, function (err) {
                console.error(err);
            });
    };

    CartFactory.deleteProduct = function (productId) {
        return $http.delete('/api/cart/' + productId)
            .then(cart => cart.data)
            .catch(function (err) {
                console.error(err);
            });
    };

    return CartFactory;

});
