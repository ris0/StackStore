app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/api/products', // api ? necessary?
        controller: 'ProductCtrl',
        templateUrl: 'js/products/templates/products.template.html'
    });

});
