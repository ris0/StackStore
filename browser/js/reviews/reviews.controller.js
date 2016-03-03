app.controller('ReviewsCtrl', function ($scope, singleProduct){
	$scope.reviews = singleProduct.reviews;
});