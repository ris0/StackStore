app.controller('AdminCtrl', function ($scope, $log, allProducts, allUsers, allCarts, CategoriesFactory, allCategories, ProductsFactory, UsersFactory, CartFactory) {
    // products
	$scope.products = allProducts;
    $scope.productAvailability = [true,false];
    $scope.productIsSelected = false;
	$scope.productToEdit = {};
	$scope.categories = allCategories;

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
    	$scope.productToEdit._id = product._id;
    	$scope.productIsSelected = true;
    	$scope.productToEdit.title = product.title;
    	$scope.productToEdit.price = product.price;
    	$scope.productToEdit.quantity = product.quantity;
    	$scope.productToEdit.availability = product.availability;
    	$scope.productToEdit.description = product.description;
    	$scope.productToEdit.image = product.image;
    };

    $scope.submitEditedProduct = function(product) {
    	console.log(product);
    	ProductsFactory.updateProduct(product._id, product)
			.then(function(res){
				console.log(res);
				console.log($scope.products);
				return res.data;
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




});
