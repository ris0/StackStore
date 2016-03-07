app.controller('AdminCtrl', function ($scope, $log, allProducts, allUsers) {
    $scope.products = allProducts;
    $scope.users = allUsers;

});
