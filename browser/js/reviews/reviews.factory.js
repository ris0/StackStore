app.factory('ReviewsFactory', function ($http, ProductsFactory) {

    var ReviewsFactory = {};

    ReviewsFactory.getReviewsByProductId = function (productId) {
        return $http.get('/api/products/' + productId + '/reviews')
            .then(reviews => reviews.data)
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    ReviewsFactory.createReview = function (productId, data) {
        return $http.post('/api/products/' + productId + '/reviews', data)
            .then(review => review.data)
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    return ReviewsFactory;

});
