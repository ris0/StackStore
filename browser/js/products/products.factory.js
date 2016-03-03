app.factory('ProductsFactory', function ($http, ReviewsFactory) {

    var ProductsFactory = {};

    ProductsFactory.getAllProducts = function () {
        return $http.get('/api/products')
            .then(products => products.data)
            .catch(function(err) { if (err) console.error(err) })
    };

    ProductsFactory.getProductById = function (productId) {
        return $http.get('/api/products/' + productId)
            .then(response => response.data)
            .then(function(product) {
                //ReviewsFactory.getReviewsByProductId(productId)
                //.then(function(res){
                //    product.reviews = res.data;
                //    return product;
                //})
                //var review = ReviewsFactory.getReviewsByProductId(productId)
                //product.review = review
                //return product
            })
            .then(productWithReview => productWithReview.data)
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
