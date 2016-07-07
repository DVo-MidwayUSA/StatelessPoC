var App = (function() {

    'use strict';

    function App($) {

        this.hub = $.connection.cartHub;

        this.hub.client.displayCart = (cartItems) => this.displayCart($, cartItems);

        this.init();

        var self = this;

        $.connection.hub.start().done(function() {

            self.getCart();

            $('[data-cart-list]')
                .on('click',
                    '[data-delete]',
                    function() {

                        var cartItemId = $(this).parents('tr').data('cart-item');

                        self.hub.server.deleteCartItem(cartItemId);

                    });

        });
    }

    App.prototype.init = function() {

        localStorage.setItem('token', this.getUrlParameterByName('token'));
    
    };

    App.prototype.displayCart = function($, cartItems) {

        var $cartList = $('[data-cart-list]').empty();

        if (cartItems.length === 0) {

            $cartList.append('<tr><td colspan="3">Cart is empty.</td></tr>')

            return;
        }

        for (var i = 0; i < cartItems.length; i++) {

            $cartList.append(`<tr data-cart-item="${cartItems[i].Id}"><td>#${cartItems[i].Sku}</td><td><input type="number" value="${cartItems[i].Quantity}" /></td><td><button data-delete>X</button></td></tr>`);
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