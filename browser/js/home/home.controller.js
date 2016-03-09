app.controller('HomeCtrl', function ($scope, $log, ProductsFactory, CartFactory, allProducts, LocalStorageFactory, categories) {

    // LocalStorageFactory.checkSession();

    $scope.products = allProducts;
    $scope.categories = categories;
    $scope.addToCart = CartFactory.addProduct;
    $scope.addWishlistProduct = CartFactory.addWishlistProduct;

    $scope.activeCategories = categories;

    $scope.setActiveCategories = function (categories) {
        $scope.activeCategories = categories;
        console.log("activeCategories: ", $scope.activeCategories);
    };

    $scope.checkCategories = function (productCategories) {
        var found = false;
        $scope.activeCategories.forEach(function (category) {
            productCategories.forEach(function (productCategory) {
                if (category.name === productCategory.name) found = true;
            });
        });
        return found;
    };

});
