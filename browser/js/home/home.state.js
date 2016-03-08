app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
            allProducts: function (ProductsFactory) {
                return ProductsFactory.getAllProducts();
            },
            categories: function (CategoriesFactory) {
                return CategoriesFactory.getCategories();
            }
        },
        controller: 'HomeCtrl'
    });

});
