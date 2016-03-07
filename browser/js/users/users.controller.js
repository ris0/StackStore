app.controller('UsersCtrl', function ($scope, $log, ProductsFactory, allProducts) {

    ProductsFactory.getAllProducts();
    $scope.products = allProducts;

});
