using System.Linq;
using Microsoft.AspNet.SignalR;
using StatelessPoC.Shop.DataAccess;

namespace StatelessPoC.Shop.Hubs
{
    public class CartHub : Hub
    {
        public void CreateCart(string token)
        {
            using (var ctx = new DataClassesDataContext())
            {
                var cart = ctx.Carts.SingleOrDefault(x => x.Token == token);

                if (cart != null)
                {
                    var totalItems = cart.CartItems.Sum(x => x.Quantity);
                    Clients.Caller.updateCartContents(totalItems, false);
                    return;
                }

                ctx.Carts.InsertOnSubmit(new Cart { Token = token });
                ctx.SubmitChanges();


            };
        }

        public void Add(string sku, int quantity, string token)
        {
            using (var ctx = new DataClassesDataContext())
            {
                var cart = ctx.Carts.Single(x => x.Token == token);
                var cartItem = new CartItem { CartId = cart.Id, Quantity = quantity, Sku = sku };
                ctx.CartItems.InsertOnSubmit(cartItem);
                ctx.SubmitChanges();

                var totalItems = cart.CartItems.Sum(x => x.Quantity);
                Clients.Caller.updateCartContents(totalItems, true);
            }
        }

        public void GetCart(string token)
        {
            using (var ctx = new DataClassesDataContext())
            {
                var cart = ctx.Carts.Single(x => x.Token == token);
                Clients.Caller.displayCart(cart.CartItems.Select(x => new { x.Sku, x.Quantity}));
            }
        }
    }
}