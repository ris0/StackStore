app.factory('ProductsFactory', function ($http) {

    var ProductsFactory = {};

    ProductsFactory.getAllProducts = function () {
        return $http.get('/api/products').then(products => console.log(products.data));
    };

    // TODO: :productId vs .../products + :productId ?
    ProductsFactory.getProductById = function (productId) {
        return $http.get('/api/products/' + productId).then(product => product.data)
            .catch(function(err) { if (err) console.error(err) })
    };



    return ProductsFactory

});
