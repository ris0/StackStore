app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, UsersFactory, CartFactory) {

    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo)
        .then(function () {
            Promise.all([ CartFactory.createCart(), CartFactory.createWishlist() ])
            .then(function () {
                $state.go('home');
            })
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

    $scope.sendSignup = function (signupInfo) {
        $scope.error = null;

        UsersFactory.createUser(signupInfo)
        .then(function(user){
            console.log(user);
            return $scope.sendLogin(signupInfo);
        }).catch(function () {
            $scope.signupError = 'This email address has been taken';
        });
    }

});