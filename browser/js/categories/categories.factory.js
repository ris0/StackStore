app.factory('CategoriesFactory', function ($http) {

    var CategoriesFactory = {};

    var cached = [];

    CategoriesFactory.getCategories = function () {
        return $http.get('/api/categories/')
            .then(function(categories){
                angular.copy(categories.data, cached);
                return cached;
            })
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    // for admins // TODO: Do we need $log?
    CategoriesFactory.createCategory = function (data) {
        return $http.post('/api/categories/', data)
            .then(function(newCategory){
                cached.push(newCategory.data);
                return newCategory.data;
            })
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    // put
    CategoriesFactory.updateCategory = function (categoryId, data) {
        return $http.put('/api/categories/' + categoryId, data)
            .then(function(updatedCategory) {
                cached.forEach(function(category){
                    if(category._id === updatedCategory.data._id){
                        angular.extend(category, updatedCategory.data);
                    }
                })
                return updatedCategory.data;
            })
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    // delete
    CategoriesFactory.deleteCategory = function (categoryId) {
        return $http.delete('/api/categories/' + categoryId)
            .then(function(res){
                cached.forEach(function(category, i, arr){
                    if(category._id === categoryId){
                        console.log(arr);
                        arr.splice(i, 1);
                    }
                })
                return res.data;
            })
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    return CategoriesFactory;

});
