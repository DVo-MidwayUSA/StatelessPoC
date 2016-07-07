(function ($) {

    var AddToCartPlugin = (function () {

        function AddToCartPlugin(element, sku) {

            this.$el = $(element);

            this.init();

        }

        AddToCartPlugin.prototype.init = function () {

            this.renderButton();

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

        return AddToCartPlugin;

    }());

    $.fn.addToCart = function (sku) {

        return this.each(function () {

            $.data(this, 'addToCart', new AddToCartPlugin(this, sku));

        });

    };

}(jQuery));