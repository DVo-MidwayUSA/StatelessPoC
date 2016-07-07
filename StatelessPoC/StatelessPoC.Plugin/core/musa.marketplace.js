var Marketplace = (function() {

    'use strict';

    function Marketplace($) {

        $.connection.hub.url = 'http://localhost:57725/signalr';

        this.hub = $.connection.cartHub;

        this.hub.client.updateCartContents = (count, shouldPulsate) => this.updateCartContents(count, shouldPulsate, $);

        $.connection.hub.start().done(() => this.init($));

    }

    Marketplace.prototype.init = function ($) {

        $('[data-add-to-cart]').on('click', (e) => this.add(e, $));

        this.createCart();

    };

    Marketplace.prototype.createCart = function() {

        var token = localStorage.getItem('token');

        this.hub.server.createCart(token);

    };

    Marketplace.prototype.add = function(e, $) {

        e.preventDefault();

        var quantity = $('[data-quantity]').val(),
            token = localStorage.getItem('token'),
            sku = $('[data-add-to-cart]').data('add-to-cart');

        this.hub.server.add(sku, quantity, token);

    };

    Marketplace.prototype.updateCartContents = function (count, shouldPulsate, $) {

        var $miniCart = $('[data-mini-cart]').text(`Checkout (${count})`),
            i = 0;

        if (!shouldPulsate) {
            return;
        }

        function pulsate() {
            if (i >= 1) return;
            $miniCart.animate({ opacity: 0.2 }, 200, 'linear')
                .animate({ opacity: 1 }, 200, 'linear', pulsate);
            i++;
        }

        pulsate();

    };


    return Marketplace;

}());