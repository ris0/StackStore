app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/my-account', // api ? necessary?
        controller: 'UserCtrl',
        templateUrl: 'js/users/templates/users.template.html'
    });

});
