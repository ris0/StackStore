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
        templateUrl: '/js/products/templates/product-details.template.html',
        resolve: {
            singleProduct: function (ProductsFactory, $stateParams) {
                return ProductsFactory.getProductById($stateParams.productId);
            },
            productReviews: function (ReviewsFactory, $stateParams) {
                return ReviewsFactory.getReviewsByProductId($stateParams.productId);
            },
            categories: function (CategoriesFactory, $stateParams) {
                return CategoriesFactory.getCategories();
            }
        }
    });
});
