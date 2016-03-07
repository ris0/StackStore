app.factory('HomeFactory', function ($http) {

    var HomeFactory = {};

    var cart = {
        "contents": []
    }
    var JSONcart = JSON.stringify(cart);

    HomeFactory.getSession = function () {
        $http.get('/session')
        .then(function () {
            if (window.useLocalStorage) {
                window.useLocalStorage = false;
            }
        }, function () {
            window.useLocalStorage = true;
            console.log(Object.keys(window.localStorage).length);
            if (Object.keys(window.localStorage).length === 0) {
                window.localStorage.setItem("cart", JSONcart)
            }
        })
    }

    return HomeFactory;

});
