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
        templateUrl: '../../site-assets/users/templates/admin.template.html',
        resolve: {
        	allProducts: function (ProductsFactory) {
        		return ProductsFactory.getAllProducts();
        	},
        	allUsers: function (UsersFactory) {
        		return UsersFactory.getAllUsers();
        	}
        }
    });

});
