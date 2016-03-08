app.controller('CartCtrl', function ($scope, CartFactory, ProductsFactory, LocalStorageFactory, oneCart) {

    $scope.cart = oneCart;

    function deleteItem (productId) {
      if (window.useLocalStorage) {
        $scope.cart = LocalStorageFactory.deleteProduct(productId); 
      }
      else {
        CartFactory.deleteProduct(productId)
        .then(function () {
          $scope.cart.contents = $scope.cart.contents.filter(function (element) {
            return element.product._id !== productId;
          })
          console.log("Item Deleted")
          console.log($scope.cart)
        })
      } 
    }

    function checkout (cartId, bool) {
      if (window.useLocalStorage) {
        $scope.cart = LocalStorageFactory.checkout(); 
      }
      else {
        console.log('Checked out!');
        CartFactory.checkout(cartId, bool)
        .then(function () {
          getCart();
        })
      }
    }

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
