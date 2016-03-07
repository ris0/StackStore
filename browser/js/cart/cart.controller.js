app.controller('CartCtrl', function ($scope, CartFactory, ProductsFactory, oneCart) {

    $scope.cart = oneCart;

    // function getCart () {
    //   CartFactory.getCurrentCart()
    //   .then(function (cart) {
    //     $scope.cart = cart;
    //     console.log(cart);
    //   })
    // }

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

    function checkout (cartId, bool) {
      console.log('Checked out!');
      CartFactory.checkout(cartId, bool)
      .then(function () {
        getCart();
      })
    }

    // getCart();
    
    $scope.deleteItem = deleteItem;

    $scope.updateProduct = CartFactory.updateProduct;

    $scope.checkout = checkout;

    $scope.totalCost = function (contents) {
      console.log(contents);
      var totalCost = 0;
      contents.forEach(function (element) {
        totalCost += element.product.price * element.quantity;
      })
      return totalCost;
    }

    $scope.totalTax = function (contents) {
      var totalCost = 0;
      contents.forEach(function (element) {
        totalCost += element.product.price * element.quantity;
      })
      return totalCost * 0.08;
    }

});
