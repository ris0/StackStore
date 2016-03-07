app.controller('HomeCtrl', function ($scope, $log, ProductsFactory, CartFactory, allProducts, HomeFactory) {

    HomeFactory.getSession();
    $scope.products = allProducts;

    $scope.addToCart = CartFactory.addProduct;   


});
