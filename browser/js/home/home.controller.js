app.controller('HomeCtrl', function ($scope, $log, ProductsFactory, CartFactory, allProducts, HomeFactory, categories) {

    HomeFactory.getSession();

    $scope.products = allProducts;
    console.log($scope.products);
    $scope.categories = categories;
    $scope.addToCart = CartFactory.addProduct;

});
