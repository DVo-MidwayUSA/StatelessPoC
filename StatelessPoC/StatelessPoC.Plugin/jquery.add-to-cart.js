(function ($) {

    var AddToCartPlugin = (function () {

        function AddToCartPlugin(element, sku) {

            this.$el = $(element);

            this.sku = sku;

            this.init();

        }

        AddToCartPlugin.prototype.init = function () {

            this.hub = $.connection.cartHub;

            this.renderButton();

            this.bindButton();

        };

        AddToCartPlugin.prototype.renderButton = function () {

            var html = `<div>
                            <a
                                data-addToCart
                                style="cursor: pointer; line-height: 18px; float: left; display: block; width: 100%; margin: 0 0 10px 0; ">
                                Add to Cart</a>
                            <input
                                min="0"
                                style="text-align: center; float: right; display: block; width: 100%; "
                                data-quantity
                                type="number"
                                value="1" />
                        </div>`;

            this.$el.replaceWith(html);

        };

        AddToCartPlugin.prototype.bindButton = function () {

            var self = this;

            console.log(this.hub);

            $('[data-addToCart]').on('click', function (e) {

                e.preventDefault();

                $.connection.hub.start().done(function () {
                    self.hub.server.add('a', 2, 'a');

                });

            });

        };

        return AddToCartPlugin;

    }());

    $.fn.addToCart = function (sku) {

        return this.each(function () {

            $.data(this, 'addToCart', new AddToCartPlugin(this, sku));

        });

    };

}(jQuery));