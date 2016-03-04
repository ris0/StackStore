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

           pastCarts: function (CartFactory, data) {
               return CartFactory.getPastCarts(data)
           },

           cartById: function (CartFactory, $stateParams) {
               // TODO: Are we passing in the right data?
               return CartFactory.getCartById($stateParams.cartId);
           },

           makeCart: function (CartFactory, data) {
               return CartFactory.createCart(data);
           },

           addProduct: function (CartFactory, $stateParams) {
               // TODO: Are we passing in the right data?
               return CartFactory.addProduct($stateParms.productId, quantity, data);
           },

           updateProduct: function (CartFactory, $stateParms) {
               return CartFactory.updateProduct($stateParams.userId)
           },

           clearCurrentCart: function (CartFactory, $stateParams) {
               return CartFactory.clearCurrentCart($stateParams.userId)
           },

           deleteProduct: function (CartFactory) {
               return CartFactory.deleteProduct()
           }
    });
});
