app.controller('AdminCtrl', function ($scope, $log, allProducts, allUsers, CategoriesFactory, allCategories, ProductsFactory) {
    $scope.products = allProducts;
    $scope.users = allUsers;
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
    	product.categories = product.categories.map(function(category){
            return category._id;
        })
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

    // Categories
    $scope.categoryIsSelected = false;
    $scope.categoryToEdit = {};
    $scope.categories = allCategories;
    $scope.addCategoryForm = false;

    $scope.setCategory = function(category) {
        console.log(category);
        $scope.addCategoryForm = false;
        $scope.categoryIsSelected = true;
        $scope.categoryToEdit = category;
    }

    $scope.submitEditedCategory = function(category) {
        console.log(category);
        CategoriesFactory.updateCategory(category._id, category)
        .then(function(res){
            $scope.categoryIsSelected = false;
        })
    }

    $scope.showAddCategoryForm = function(){
        $scope.categoryIsSelected = false;
        $scope.addCategoryForm = true;
        $scope.categoryToAdd = {};
    }

    $scope.submitNewCategory = function(category) {
        console.log(category);
        CategoriesFactory.createCategory(category)
        .then(function(res){
            $scope.categoryToAdd = {};
            $scope.addCategoryForm = false;
        })
    }

    $scope.deleteCategory = function(categoryId) {
        
        CategoriesFactory.deleteCategory(categoryId)
        .then(function(res){
            return res.data;
        })
    }

});
