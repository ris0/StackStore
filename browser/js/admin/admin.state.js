app.config(function ($stateProvider) {
    /*
     The admin should be able to do the following:
     Product management:
     - create and edit products with name, description, price and photos: ProductsFactory.updateProduct
     - Create/add/remove categories from items: We have routes defined for this but none of our factories are making the AJAX request for creating/deleting/
     - Manage the availability of a product: * Define a route that will toggle availability boolean and make the AJAX request on the UserFactory.

     Order management:
     - View a list of all orders: ProductsFactory.getAllCarts()
     - Filter orders by status: * Pending vs complete? What about created/processing/cancelled?
     - Change the status of the order: * Does CartFactory.update() working for this?
     - View details of a specific order: * getCartById

     User management:
     - Promote other user accounts to have admin status: * It doesn't look we have anything set for this
     - Delete a user: UsersFactory.deleteUser();
     - Trigger password reset for a user: * We don't have anything defined to trigger this.

    */

    $stateProvider.state('admin', {
        url: '/admin', // api ? necessary?
        controller: 'AdminCtrl',
        templateUrl: 'js/admin/templates/admin.template.html',
        resolve: {
        	allCarts: function (CartFactory) {
        		return CartFactory.getAllCarts();
        	},
            allProducts: function (ProductsFactory) {
                return ProductsFactory.getAllProducts();
            },
            allUsers: function (UsersFactory) {
                return UsersFactory.getAllUsers();
            },
            allCategories: function (CategoriesFactory) {
                return CategoriesFactory.getCategories();
            }

            // user management: promote other use accounts to have admin status, delete a user, trigger password reset


        }
    });

    $stateProvider.state('admin.products', {
        url: '/products',
        templateUrl:'js/admin/templates/admin.products.html'
    });

    $stateProvider.state('admin.carts', {
        url: '/carts',
        templateUrl:'js/admin/templates/admin.carts.html'
    });

    $stateProvider.state('admin.users', {
        url: '/users',
        templateUrl:'js/admin/templates/admin.users.html'
    });

});
