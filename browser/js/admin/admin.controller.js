app.controller('AdminCtrl', function ($scope, $log, allProducts, allUsers, CategoriesFactory, allCategories, ProductsFactory) {
    $scope.products = allProducts;
    $scope.users = allUsers;
    $scope.thisProduct;
    $scope.productAvailability = [true,false];
    $scope.productIsSelected = false;
	$scope.productToEdit = {};
	$scope.categories = allCategories;
    $scope.addProductForm = false;

    $scope.setProduct = function(product) {
        console.log(product);
        $scope.addProductForm = false;
    	$scope.productIsSelected = true;
    	$scope.productToEdit = product;
    }

    $scope.submitEditedProduct = function(product) {
    	console.log(product);
    	ProductsFactory.updateProduct(product._id, product)
    	.then(function(res){
    		$scope.productIsSelected = false;
    	})
    }

    $scope.showAddProductForm = function(){
        $scope.productIsSelected = false;
        $scope.addProductForm = true;
        $scope.productToAdd = {};
    }

    $scope.submitNewProduct = function(product) {
        console.log(product);
        ProductsFactory.createProduct(product)
        .then(function(res){
            $scope.productToAdd = {};
            $scope.addProductForm = false;
        })
    }

    $scope.deleteProduct = function(productId) {
        
        ProductsFactory.deleteProduct(productId)
        .then(function(res){
            return res.data;
        })
    }

});
