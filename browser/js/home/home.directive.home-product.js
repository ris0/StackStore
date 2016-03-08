app.directive('homeProduct', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/home/home-product.html',
        scope: {
            product: '=',
            addToCart: '=',
            checkCategories: '='
        }
    };
});
