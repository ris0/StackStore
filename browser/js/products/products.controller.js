app.controller('ProductsCtrl', function ($scope, $log, ProductsFactory, allProducts) {

    ProductsFactory.getAllProducts();
    $scope.products = allProducts;

});

app.controller('singleProductCtrl', function ($scope, $log, ProductsFactory, ReviewsFactory, singleProduct, productReviews, AuthService, CartFactory) {

    $scope.product = singleProduct;
    $scope.reviews = productReviews;
    $scope.isLoggedIn = function () {
        return AuthService.isAuthenticated();
    };
    AuthService.getLoggedInUser()
        .then(function (user) {
            $scope.user = user;
        });
    $scope.submitReview = function () {
        ReviewsFactory.createReview(singleProduct._id, {
                content: $scope.content,
                user: $scope.user,
                product: singleProduct._id,
                rating: $scope.rating
            })
            .then(review => $scope.reviews.push(review));
    };
    $scope.addToCart = function (productId, quantity) {
        CartFactory.addProduct(productId, quantity);
        $state.go('cart');
    };
});
