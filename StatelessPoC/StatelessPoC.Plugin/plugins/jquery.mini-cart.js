(function ($) {

    var MiniCart = (function () {

        'use strict';

        function MiniCart(element) {

            this.$el = $(element);

            this.init();

        }

        MiniCart.prototype.init = function () {

            this.getToken();

            this.renderButton();

            this.bindButton();

        };

        MiniCart.prototype.getToken = function () {

            var localToken = localStorage.getItem('token');

            if (localToken != null) {
                return;
            }

            $.ajax({
                url: 'http://localhost:57725/api/token/',
                success: function (data) {

                    localStorage.setItem('token', data.Token);

                }
            });

        };

        MiniCart.prototype.renderButton = function () {

            var html = `<button
							data-mini-cart style="text-transform:uppercase; display: block; font-size: .8em; width:150px; height: 32px; top: 22px; right: 280px; border-radius:3px; border:#a47849; background:#a47849; color: white; position:absolute; z-index:10000;">
							Checkout (0)</button>`;

            this.$el.replaceWith(html);

        };

        MiniCart.prototype.bindButton = function () {

            $('[data-mini-cart]').on('click', function (e) {

                e.preventDefault();

                var token = localStorage.getItem('token');
                window.location.href = `http://localhost:57725/?token=${token}`;

            });

        };

        return MiniCart;

    }());

	$.fn.miniCart = function () {

		return this.each(function () {

			$.data(this, 'miniCart', new MiniCart(this));

		});

	};

}(jQuery));