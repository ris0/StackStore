app.controller('HomeCtrl', function ($scope, $log, ProductsFactory, allProducts) {

    $scope.products = allProducts;

});
