app.controller('ProductsCtrl', function ($scope, theProducts) {
    // on load: resolve theProducts from the productsFactory
    $scope.products = theProducts;
    // Images of beautiful Fullstack people.
    //$scope.images = _.shuffle(FullstackPics);

});
