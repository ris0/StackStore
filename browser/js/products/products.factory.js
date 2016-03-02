app.factory('ProductsFactory', function ($http) {

    var ProductsFactory = {};

    ProductsFactory.getAllProducts = function () {
        return $http.get('/api/products').then(products => products);
    };

    ProductsFactory.getProductById = function () {
        return $http.get('/api/:productId').then(product => product)
    };

    // TODO: Should we define functions that will get specific information about a products (i.e desc, price, etc)
    // I think that everything should be defined on the scope as an object. Should be able to filter through...

    //ProductsFactory.= function () {};

    return ProductsFactory

});

