app.config(function ($stateProvider) {

    $stateProvider.state('wishlist', {
        url: '/wishlist',
        templateUrl: 'js/wishlist/wishlist.template.html',
        resolve: {

          oneCart: function (CartFactory) {
            return CartFactory.getCurrentCart();
          }

        },
        controller: 'WishlistCtrl'
    });
});
