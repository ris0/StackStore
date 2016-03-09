app.factory('UsersFactory', function ($http) {

    var UsersFactory = {},
        cached = [];


    // BUG possibility: do we need to send data payload
    // to authenticate the user as an admin?
    UsersFactory.getAllUsers = function () {
        return $http.get('/api/users')
        .then(function (users) {
            angular.copy(users.data, cached);
            return cached;
        })
        .catch(function(err) { console.error(err); });
    };

    // BUG possibility: do we need to send data payload
    // to authenticate the user as an admin?
    UsersFactory.getUserById = function (userId) {
        return $http.get('/api/users/' + userId)
        .then(user => user.data)
        .catch(function(err) { console.error(err); });
    };

    UsersFactory.createUser = function (data) {
        return $http.post('/api/users', data)
        .then(user => user.data)
    };

    UsersFactory.updateUser = function (userId, data) {
        return $http.put('/api/users/' + userId, data)
            .then(function(newUser) {
                cached.forEach(function(user) {
                    if (user._id = newUser.data._id) {
                        angular.extend(user, newUser.data);
                    }
                });
                return newUser.data
            })
            .catch(function(err) { console.error(err); });
    };

    UsersFactory.deleteUser = function (userId) {
        return $http.delete('/api/users/' + userId)
                    .then(function (res) {
                        cached.forEach(function (user, i, arr) {
                            if(user._id === userId) { arr.splice(i, 1) }
                        });
                        return res.data;
                    })
                    .catch(function(err) { console.error(err); });
    };

    return UsersFactory;

});
