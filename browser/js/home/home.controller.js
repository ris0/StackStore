app.controller('HomeCtrl', function ($scope, $log, ProductsFactory, CartFactory, allProducts) {

    $scope.products = allProducts;

    $scope.addToCart = function () {
      console.log("GOT HERE YO")
      return CartFactory.addProduct;  
    }


});
