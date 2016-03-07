app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('admin', {
        url: '/admin', // api ? necessary?
        controller: 'AdminCtrl',
        templateUrl: 'js/users/templates/admins.template.html',
        resolve: {
        	allProducts: function (ProductFactory) {
        		return ProductFactory.getAllProducts();
        	},
        	allUsers: function (UsersFactory) {
        		return UsersFactory.getAllUsers();
        	}
        }
    });

});
