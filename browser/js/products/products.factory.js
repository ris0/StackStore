app.factory('ProductsFactory', function ($http) {

    var ProductsFactory = {};

    ProductsFactory.getAllProducts = function () {
        return $http.get('/api/products')
            .then(products => products.data)
            .catch(function(err) { if (err) console.error(err) })
    };

    ProductsFactory.getProductById = function (productId) {
        var productToReturn;
        return $http.get('/api/products/' + productId)
            .then(product => product.data)
            .catch(function(err) { if (err) console.error(err) })
    };

    // for admin // TODO: Do we need $log?
    ProductsFactory.createProduct = function (data) {
        return $http.post('/api/products', data)
            .then(newProducts => newProducts.data)
            .catch(function(err) { if (err) console.error(err) })
    };

    // put
    ProductsFactory.updateProduct = function (productId, data) {
        return $http.product('/api/products' + productId, data)
            .then(updatedProduct => updatedProduct.data)
            .catch(function(err) { if (err) console.error(err) })
    };

    // delete
    ProductsFactory.deleteProduct= function (productId) {
        return $http.delete('/api/products/' + productId)
            .then(deletedProduct => deletedProduct.statusText)
            .catch(function(err) { if (err) console.error(err) })
    };

    return ProductsFactory;

});
