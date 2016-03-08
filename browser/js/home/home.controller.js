app.controller('HomeCtrl', function ($scope, $log, ProductsFactory, CartFactory, allProducts, LocalStorageFactory, categories) {

    // LocalStorageFactory.checkSession();

    $scope.products = allProducts;
    console.log($scope.products);
    $scope.categories = categories;
    $scope.addToCart = CartFactory.addProduct;

});
