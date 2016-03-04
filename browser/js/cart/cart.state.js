app.config(function ($stateProvider) {

    $stateProvider.state('cart', {
        url: '/my-cart',
        controller: 'CartCtrl',
        templateUrl: 'js/users/templates/cart.template.html'
    });

});
