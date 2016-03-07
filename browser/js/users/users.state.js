app.config(function ($stateProvider) {

/*
Authenticated Users should be to do the following:
Logout
Account management:
 - View past order list: CartFactory.getPastCarts()
 - View order details:
    - Current order status - * We need more than a pending status. User needs to be able to see if the order was created, processing, and cancelled.
    - Items with quantity and subtotal - getPastCarts() vs route that will provide us this information
    - Link to the original product detail page - getPastCarts() + getProductById();
    - Date/time order was created - * We don't have anything to provide us this information

Product reviews:
 - Leave a review for a product -> Form that will send schema requirements
 - Update/Delete review: Not required but I would imagine this would be a useful feature
*/

    $stateProvider.state('user', {
        url: '/my-account',
        controller: 'UserCtrl',
        templateUrl: 'js/users/templates/users.template.html',
        resolve: {

            findUser: function (UsersFactory, $stateParams) {
                return UsersFactory.getUserById($stateParams.userId);
            },

            updateUser: function (UsersFactory, $stateParams, data) {
                return UsersFactory.updateUser($stateParams.userId, data);
            },

            deleteUser: function (UsersFactory, $stateParams) {
                return UsersFactory.updateUser($stateParams.userId);
            }
        }
    });

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
        url: '/my-account',
        controller: 'UserCtrl',
        templateUrl: 'js/users/templates/users.template.html',
        resolve: {
            allUsers: function (UsersFactory, $stateParams) {
                return UsersFactory.deleteUser($stateParams.userId)
            }
        }
    });

});
