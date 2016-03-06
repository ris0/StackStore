app.controller('CartCtrl', function ($scope, CartFactory, ProductsFactory, oneCart) {

    function getCart () {
      CartFactory.getCurrentCart()
      .then(function (cart) {
        $scope.cart = cart;
        console.log(cart);
      })
    }

    // maipulates the $scope's cart, rather than making more api calls and assigning to 
    // $scope through getCart()
    function deleteItem (productId) {
      CartFactory.deleteProduct(productId)
      .then(function () {
        $scope.cart.contents = $scope.cart.contents.filter(function (element) {
          return element.product._id !== productId;
        })
        console.log("Item Deleted")
        console.log($scope.cart)
      })
    }

    getCart();
    
    $scope.deleteProduct = deleteItem;

    // update qty of cart
    // input qty
    // press button
    // makes api call to backend to update

    $scope.updateQty = function () {

    }



});