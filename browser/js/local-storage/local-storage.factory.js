app.factory('LocalStorageFactory', function ($http) {

    var LocalStorageFactory = {};

    function parseCart () {
        return JSON.parse(window.localStorage.cart);
    }

    function setCart (obj) {
        return window.localStorage.setItem("cart", JSON.stringify(obj));
    }

    LocalStorageFactory.checkSession = function () {
        var cart = {
            "contents": []
        }
        var JSONcart = JSON.stringify(cart);

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

    LocalStorageFactory.getCurrentCart = function () {
        return parseCart();
    };

    LocalStorageFactory.addProduct = function (productId, quantity, data) {
        $http.get('api/products/' + productId)
        .then(function (product) {
            var found = false;
            var JSONcart = parseCart();

            JSONcart.contents.forEach(function (element) {
                if (element.product._id === productId) {
                    element.quantity += quantity;
                    found = true;
                }
            })
            if (!found) {
                var obj = {
                    quantity : quantity,
                    product : product.data
                }
                JSONcart.contents.push(obj);
            }
            return setCart(JSONcart);
        })
    };

    LocalStorageFactory.updateProduct = function (productId, quantity, data) {
        var JSONcart = parseCart();
        JSONcart.contents.forEach(function (element) {
            console.log("Quantity Changed!")
            if (element.product._id === productId) element.quantity = quantity;
        })
        return setCart(JSONcart); 
    };

    LocalStorageFactory.deleteProduct = function (productId) {
        var JSONcart = parseCart();
        JSONcart.contents.forEach(function (element, index) {
            console.log("Item Deleted!")
            if (element.product._id === productId) JSONcart.contents.splice(index, 1);
        })
        setCart(JSONcart); 
        return parseCart();
    };

    LocalStorageFactory.checkout = function () {
        // do something with JSONcart?
        var JSONcart = parseCart();
        var newCart = {
        "contents": []
        };
        setCart(newCart);
        console.log("This cart was deleted:\n", JSONcart);
        return newCart;
    }

    return LocalStorageFactory;

});
