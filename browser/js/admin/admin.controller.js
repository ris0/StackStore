app.controller('AdminCtrl', function ($scope, $log, allProducts, allUsers, allCarts, CategoriesFactory, allCategories, ProductsFactory, UsersFactory, CartFactory) {
    $scope.products = allProducts;
    $scope.users = allUsers;
    $scope.productAvailability = [true,false];
    $scope.productIsSelected = false;
	$scope.productToEdit = {};
	$scope.categories = allCategories;
    $scope.addProductForm = false;

    // users
    $scope.userToEdit = {};
    $scope.users = allUsers;
    $scope.userIsSelected = false;
    $scope.userIsAdmin= [true,false];

    // carts
    $scope.cartToEdit = {};
    $scope.carts = allCarts;
    $scope.cartIsSelected = false;

    // <----  product  ---->
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
				console.log(res);
				console.log($scope.products);
				return res.data;
			})
            .then(function(res){
                $scope.productIsSelected = false;
            })
    };

	// <----  user  ---->
	$scope.setUser = function(user) {
		$scope.userIsSelected = true;
		$scope.userToEdit._id = user._id;
		$scope.userToEdit.email = user.email;
		$scope.userToEdit.password = user.password;
		$scope.userToEdit.isAdmin = user.isAdmin;
		$scope.userToEdit = user;
	};

	$scope.submitEditedUser = function(user) {
		UsersFactory.updateUser(user._id, user)
			.then(user => user.data)
	};

	$scope.deleteUser = function(user) {
		console.log(user);
		UsersFactory.deleteUser(user._id)
			.then(user => user.data)
	};

	// <---- orders ---->
	$scope.setCart = function(cart) {
		$scope.cartIsSelected = true;
		$scope.cartToEdit._id = cart._id;
		$scope.cartToEdit.contents.quantity = cart.contents.quantity;
		$scope.cartToEdit.contents.product = cart.contents.product;
		$scope.cartToEdit = cart;
	};

	$scope.submitEditedCart = function(cart) {

	};

	/*
	 <div>
	 <h3>Artists</h3>
	 <div class="panel input-group">
	 <span class="input-group-addon">Filter</span>
	 <input type="text" class="form-control" placeholder="by name" ng-model="nameSearch">
	 </div>
	 <div class="list-group">
	 <div class="list-group-item" ng-repeat="artist in artists | filter: { name: nameSearch }">
	 <a ui-sref="artist({artistId: artist._id})">{{ artist.name }}</a>
	 </div>
	 </div>
	 </div>

	 */


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
