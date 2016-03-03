app.factory('ReviewsFactory', function ($http, ProductsFactory) {

    var ReviewsFactory = {};

    ReviewsFactory.getReviewsByProductId = function (productId) {
        return $http.get('/api/products/' + productId+ '/reviews')
        .then(function(res){
            return res.data;
        }).catch(function(err) { if (err) console.error(err) });
    };

    ReviewsFactory.createReview = function (productId, data) {
        return $http.post('/api/products/' + productId + '/reviews', data)
        .then(function(res){
            console.log(res.data);
            return res.data;
        }).catch(function(err) { if (err) console.error(err) });
    };

    // TODO: Should we define functions that will get specific information about a Reviews (i.e desc, price, etc)
    // I think that everything should be defined on the scope as an object. Should be able to filter through...

    //ReviewsFactory.= function () {};

    return ReviewsFactory;

});
