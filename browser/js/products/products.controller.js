app.controller('ProductsCtrl', function ($scope, $log, ProductsFactory, allProducts) {

    ProductsFactory.getAllProducts();
    $scope.products = allProducts;

});

app.controller('singleProductCtrl', function ($scope, $log, ProductsFactory, singleProduct) {

    $scope.product = singleProduct;
    // ProductsFactory.getProductById('56d8bbfb37091f7413fb0250');

});
