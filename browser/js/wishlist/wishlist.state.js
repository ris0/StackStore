app.config(function ($stateProvider) {

    $stateProvider.state('wishlist', {
        url: '/wishlist',
        templateUrl: 'js/wishlist/wishlist.template.html',
        resolve: {

          wishlist: function (CartFactory) {
            return CartFactory.getWishlist();
          }

        },
        controller: 'WishlistCtrl'
    });
});
