app.controller('HomeCtrl', function ($scope, $log, ProductsFactory, CartFactory, allProducts) {

    $scope.products = allProducts;

    $scope.addToCart = CartFactory.addProduct;   


});
