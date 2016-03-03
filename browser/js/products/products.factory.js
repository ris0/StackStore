app.factory('ProductsFactory', function ($http, ReviewsFactory) {

    var ProductsFactory = {};

    ProductsFactory.getAllProducts = function () {
        return $http.get('/api/products')
            .then(function(product) {
                return product.data;
            })
            .catch(function(err) { if (err) console.error(err) })
    };

    ProductsFactory.getProductById = function (productId) {
        var productToReturn;
        return $http.get('/api/products/' + productId)
            .then(product => product.data)
            .then(function(product) {
                console.log(product);
                productToReturn = product;
                return ReviewsFactory.getReviewsByProductId(productId);
            })
            .then(review => {
                productToReturn.review = review.data;
                console.log(productToReturn);
                return productToReturn;
            })
            .catch(function(err) { if (err) console.error(err) })
    };

    // for admins // TODO: Do we need $log?
    ProductsFactory.createProduct = function () {
        return $http.post('/api/products', data)
            .then(newProduct => newProducts.data)
            .catch(function(err) { if (err) console.error(err) })
    };

    // put
    ProductsFactory.updateProduct = function (productId) {
        return $http.product('/api/products' + productId, data)
            .then(updatedProduct => updatedProduct.data) // TODO: Do we want to return something?
            .catch(function(err) { if (err) console.error(err) })
    };

    // delete
    ProductsFactory.deleteProduct= function (productId) {
        return $http.delete('/api/products/' + productId)
            .then(deletedProduct => deletedProduct.statusText)
            .catch(function(err) { if (err) console.error(err) })
    };

    return ProductsFactory

});
