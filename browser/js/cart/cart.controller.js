app.controller('CartCtrl', function ($scope, $log, CartFactory, oneCart) {

    $scope.oneCart = oneCart;
    console.log(oneCart);

    $scope.makeCart = CartFactory.createCart;

    

});
