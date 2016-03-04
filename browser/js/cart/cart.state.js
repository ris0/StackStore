app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        resolve: {
           allCarts: function (CartFactory) {
               return CartFactory.getAllCarts();
           },

           oneCart: function (CartFactory, data) {
               return CartFactory.getCurrentCart(data);
           },

           cartById: function (CartFactory, $stateParams) {
               // TODO: Are we passing in the right data?
               return CartFactory.getCartById($stateParams.cartId);
           },

           makeCart: function (CartFactory, data) {
               return CartFactory.createCart(data);
           },
    });
});
