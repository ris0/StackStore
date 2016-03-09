app.factory('ProductsFactory', function ($http) {

    var ProductsFactory = {};

    var cached = [];

    ProductsFactory.getAllProducts = function (data) {
        return $http.get('/api/products', data)
            .then(function(products) {
                angular.copy(products.data, cached);
                return cached;
            })
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    ProductsFactory.getProductById = function (productId) {
        var productToReturn;
        return $http.get('/api/products/' + productId)
            .then(product => product.data)
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    // for admin // TODO: Do we need $log?
    ProductsFactory.createProduct = function (data) {
        return $http.post('/api/products', data)
            .then(function(newProduct){
                cached.push(newProduct.data);
                return newProduct.data;
            })
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    // put
    ProductsFactory.updateProduct = function (productId, data) {
        return $http.put('/api/products/' + productId, data)
            .then(function(updatedProduct) {
                cached.forEach(function(product){
                    if(product._id === updatedProduct.data._id){
                        angular.extend(product, updatedProduct.data);
                    }
                })
                return updatedProduct.data;
            })
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    // delete
    ProductsFactory.deleteProduct = function (productId) {
        return $http.delete('/api/products/' + productId)
            .then(function(res){
                cached.forEach(function(product, i, arr){
                    if(product._id === productId){
                        console.log(arr);
                        arr.splice(i, 1);
                    }
                })
                return res.data;
            })
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    return ProductsFactory;

});
