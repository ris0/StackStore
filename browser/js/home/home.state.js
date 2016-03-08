app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/:category',
        templateUrl: 'js/home/home.html',
        resolve: {
            allProducts: function (ProductsFactory, $stateParams) {
                console.log($stateParams.category);
                return ProductsFactory.getAllProducts($stateParams.category);
            },
            categories: function (CategoriesFactory) {
                return CategoriesFactory.getCategories();
            }
        },
        controller: 'HomeCtrl'
    });

});
