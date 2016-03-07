app.controller('ProductsCtrl', function ($scope, $log, ProductsFactory, allProducts) {

    ProductsFactory.getAllProducts();
    $scope.products = allProducts;

});

app.controller('singleProductCtrl', function ($scope, $log, ProductsFactory, ReviewsFactory, singleProduct, productReviews, AuthService) {

    $scope.product = singleProduct;
    $scope.reviews = productReviews;
    $scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
    };
    $scope.user = Promise.resolve(AuthService.getLoggedInUser());
    $scope.submitReview = function () {
        ReviewsFactory.createReview(singleProduct._id, {
            content: $scope.content,
            user: user,
            rating: $scope.rating
        });
    };
});
