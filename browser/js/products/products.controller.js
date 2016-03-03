app.controller('ProductsCtrl', function ($scope, $log, ProductsFactory, allProducts) {

    ProductsFactory.getAllProducts();
    console.log('yo mama so fat, she broke the bank');
    $scope.products= allProducts;

});

app.controller('singleProductCtrl', function ($scope, $log, ProductsFactory, singleProduct) {

    $scope.product= singleProduct;

});
