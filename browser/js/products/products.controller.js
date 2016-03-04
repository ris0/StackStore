app.controller('ProductsCtrl', function ($scope, $log, ProductsFactory, allProducts) {

    ProductsFactory.getAllProducts();
    $scope.products = allProducts;

});

app.controller('singleProductCtrl', function ($scope, $log, ProductsFactory, singleProduct, productReviews) {

    $scope.product = singleProduct;
    $scope.reviews = productReviews;

});
