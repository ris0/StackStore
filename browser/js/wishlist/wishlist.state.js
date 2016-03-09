app.config(function ($stateProvider) {

    $stateProvider.state('wishlist', {
        url: '/wishlist',
        templateUrl: 'js/wishlist/wishlist.template.html',
        resolve: {

          wishlist: function (CartFactory) {
            console.log("RESOLVED")
            return CartFactory.getWishlist();
          }

        },
        controller: 'WishlistCtrl'
    });
});
