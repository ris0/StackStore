app.controller('WishlistCtrl', function ($scope, CartFactory, ProductsFactory, LocalStorageFactory, wishlist) {

  console.log('This is the wishlist ', wishlist);
  $scope.wishlist = wishlist;

  function deleteItem (productId) {
      CartFactory.deleteWishlistItem(productId)
      .then(function () {
        $scope.wishlist.contents = $scope.wishlist.contents.filter(function (element) {
          return element.product._id !== productId;
        })
        console.log('Item Deleted: ', $scope.cart);
      })
    }

  $scope.deleteItem = deleteItem;  
  $scope.addWishlistProduct = CartFactory.addWishlistProduct;

});
