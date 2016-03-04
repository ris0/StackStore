app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('product', {
        url: '/product',
        controller: 'ProductCtrl',
        templateUrl: 'js/products/templates/products.template.html'
    });
});
