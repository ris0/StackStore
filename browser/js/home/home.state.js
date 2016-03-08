app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/:categories',
        templateUrl: 'js/home/home.html',
        resolve: {
            allProducts: function (ProductsFactory) {
                return ProductsFactory.getAllProducts();
            },
            categories: function (CategoriesFactory, $stateParams) {
                console.dir($stateParams.categories[0]);
                return CategoriesFactory.getCategories();
            }
        },
        controller: 'HomeCtrl'
    });

});
