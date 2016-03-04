app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        controller: 'ProductsCtrl',
        templateUrl: '/js/products/templates/products.template.html',
        resolve: {
            allProducts: function (ProductsFactory) {
                return ProductsFactory.getAllProducts();
            }
        }
    });

    $stateProvider.state('product', {
        url: '/products/:productId',
        controller: 'singleProductCtrl',
        templateUrl: '/js/products/templates/products.template.html',
        resolve: {
            allProduct: function (ProductsFactory, $stateParams) {
                return ProductsFactory.getProductById($stateParams.productId);
            }
        }
    });
});
