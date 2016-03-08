app.controller('HomeCtrl', function ($scope, $log, ProductsFactory, CartFactory, allProducts, LocalStorageFactory) {

    // LocalStorageFactory.checkSession();

    $scope.products = allProducts;

    $scope.addToCart = CartFactory.addProduct;   

});
