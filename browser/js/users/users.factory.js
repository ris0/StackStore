app.factory('UsersFactory', function ($http) {

    var UsersFactory = {};

    UsersFactory.getAllUsers = function () {
        return $http.get('/api/users')
        .then(users => users.data)
        .catch(function(err) { console.error(err); });
    };

    UsersFactory.getUserById = function (userId) {
        return $http.get('/api/users/' + userId)
        .then(user => user.data)
        .catch(function(err) { console.error(err); });
    };

    UsersFactory.createUser = function (data) {
        return $http.post('/api/users', data)
        .then(user => user.data)
        .catch(function(err) { console.error(err); });
    };

    UsersFactory.updateUser = function (userId, data) {
        return $http.put('/api/users/' + userId, data)
        .then(user => user.data)
        .catch(function(err) { console.error(err); });
    };

    UsersFactory.deleteUser = function (userId) {
        return $http.put('/api/users/' + userId)
        .catch(function(err) { console.error(err); });
    };

    return UsersFactory;

});

