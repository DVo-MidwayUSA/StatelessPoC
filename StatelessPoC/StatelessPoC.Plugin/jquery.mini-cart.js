(function ($) {

	var MiniCart = (function () {

		function MiniCart(element) {

			this.$el = $(element);

			this.init();

		}

		MiniCart.prototype.init = function () {

			this.renderButton();

		};

		MiniCart.prototype.renderButton = function () {

			var html = `<button
							data-miniCart style="text-transform:uppercase; display: block; font-size: .8em; width:120px; height: 32px; top: 22px; right: 280px; border-radius:3px; border:#a47849; background:#a47849; color: white; position:absolute; z-index:10000;">
							Checkout</button>`;

			this.$el.replaceWith(html);

		};

		return MiniCart;

	}());

	$.fn.miniCart = function () {

		return this.each(function () {

			$.data(this, 'miniCart', new MiniCart(this));

		});

	};

}(jQuery));