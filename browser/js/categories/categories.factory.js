app.factory('CategoriesFactory', function ($http) {

    var CategoriesFactory = {};

    CategoriesFactory.getCategories = function () {
        return $http.get('/api/categories')
            .then(categories => categories.data)
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    // for admins // TODO: Do we need $log?
    CategoriesFactory.createCategory = function (data) {
        return $http.post('/api/categories', data)
            .then(newCategory => newCategory.data)
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    // put
    CategoriesFactory.updateCategory = function (categoryId, data) {
        return $http.put('/api/categories' + categoryId, data)
            .then(updatedCategory => updatedCategory.data)
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    // delete
    CategoriesFactory.deleteCategory = function (categoryId) {
        return $http.delete('/api/categories/' + categoryId)
            .then(deletedCategory => deletedCategory.statusText)
            .catch(function (err) {
                if (err) console.error(err);
            });
    };

    return CategoriesFactory;

});
