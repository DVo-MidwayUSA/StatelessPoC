var App = (function() {

    'use strict';

    function App($) {

        this.hub = $.connection.cartHub;

        this.hub.client.displayCart = (cartItems) => this.displayCart($, cartItems);

        this.init();

        $.connection.hub.start().done(() => this.getCart());
    }

    App.prototype.init = function() {

        localStorage.setItem('token', this.getUrlParameterByName('token'));
    
    };

    App.prototype.displayCart = function($, cartItems) {

        for (var i = 0; i < cartItems.length; i++) {

            $('[data-cart-list]').append(`<tr><td>${cartItems[i].Sku}</td><td>${cartItems[i].Quantity}</td></tr>`);
        }

    };

    App.prototype.getCart = function() {

        var token = localStorage.getItem('token');
        this.hub.server.getCart(token);

    };

    App.prototype.getUrlParameterByName = function(name, url) {

        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    return App;

}());