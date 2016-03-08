app.controller('AdminCtrl', function ($scope, $log, allProducts, allUsers, CategoriesFactory, allCategories, ProductsFactory) {
    $scope.products = allProducts;
    $scope.users = allUsers;
    $scope.thisProduct;
    $scope.productAvailability = [true,false];
    $scope.productIsSelected = false;
	$scope.productToEdit = {};
	$scope.categories = allCategories;


    $scope.setProduct = function(product) {
    	$scope.productToEdit._id = product._id;
    	$scope.productIsSelected = true;
    	$scope.productToEdit.title = product.title;
    	$scope.productToEdit.price = product.price;
    	$scope.productToEdit.quantity = product.quantity;
    	$scope.productToEdit.availability = product.availability;
    	$scope.productToEdit.description = product.description;
    	$scope.productToEdit.image = product.image;
    }

    $scope.submitEditedProduct = function(product) {
    	console.log(product);
    	ProductsFactory.updateProduct(product._id, product)
    	.then(function(res){
    		console.log(res);
    		console.log($scope.products);
    		return res.data;
    	})
    }

});
