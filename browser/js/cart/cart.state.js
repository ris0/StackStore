app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        resolve: {

          oneCart: function (CartFactory) {
            return CartFactory.getCurrentCart();
          }

        },
        controller: 'CartCtrl'
    });
});
