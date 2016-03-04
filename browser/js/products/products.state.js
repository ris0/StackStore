app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('products', {
        url: '/products',
        controller: 'ProductCtrl',
        templateUrl: 'js/products/templates/products.template.html'
    });

});
