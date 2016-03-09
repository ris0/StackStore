app.directive('productForm', function ($rootScope, AuthService, AUTH_EVENTS, $state, ProductsFactory) {

    return {
        restrict: 'E',
        scope: {
            productToEdit: '='
        },
        templateUrl: 'js/common/directives/productForm/productForm.directive.html',
        link: function (scope) {

        scope.setProduct = function(product) {
            scope.productToEdit._id = product._id;
            scope.productIsSelected = true;
            scope.productToEdit.title = product.title;
            scope.productToEdit.price = product.price;
            scope.productToEdit.quantity = product.quantity;
            scope.productToEdit.availability = product.availability;
            scope.productToEdit.description = product.description;
            scope.productToEdit.image = product.image;
        }

        scope.submitEditedProduct = function(product) {
            console.log(product);
            ProductsFactory.updateProduct(product._id, product)
            .then(function(res){
                scope.productIsSelected = false;
            })
        }

        }

    };

});
