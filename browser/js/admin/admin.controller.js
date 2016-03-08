app.controller('AdminCtrl', function ($scope, $log, allProducts, allUsers) {
    $scope.products = allProducts;
    $scope.users = allUsers;
    $scope.thisProduct;
    $scope.availability = [true,false]
    $scope.productIsSelected = false;
    $scope.setProduct = function(product) {
    	$scope.productIsSelected = true;
    	$scope.productToEdit = {};
    	$scope.productToEdit.title = product.title;
    	$scope.productToEdit.price = product.price;
    	$scope.productToEdit.quantity = product.quantity;
    	$scope.productToEdit.availability = product.availability;
    	$scope.productToEdit.description = product.description;
    	$scope.productToEdit.image = product.image;
    }

});
