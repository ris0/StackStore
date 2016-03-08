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

    //$stateProvider.state('user', {
    //    url: '/user',
    //    controller: 'UsersCtrl',
    //    templateUrl: '../../site-assets/users/templates/user.template.html'
    //    //resolve: {
    //    //
    //    //    findUser: function (UsersFactory, $stateParams) {
    //    //        return UsersFactory.getUserById($stateParams.userId);
    //    //    },
    //    //
    //    //    updateUser: function (UsersFactory, $stateParams, data) {
    //    //        return UsersFactory.updateUser($stateParams.userId, data);
    //    //    },
    //    //
    //    //    deleteUser: function (UsersFactory, $stateParams) {
    //    //        return UsersFactory.updateUser($stateParams.userId);
    //    //    }
    //    //}
    //});


});
