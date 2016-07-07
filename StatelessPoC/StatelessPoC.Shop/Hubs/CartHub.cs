using Microsoft.AspNet.SignalR;

namespace StatelessPoC.Shop.Hubs
{
    public class CartHub : Hub
    {
        public void Add(string sku, int quantity, string token)
        {
            quantity = 1;
            Clients.Caller.updateCartContents(quantity);
        }
    }
}