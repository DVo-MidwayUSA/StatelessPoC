using StatelessPoC.Shop.Models;
using System;
using System.Web.Http;

namespace StatelessPoC.Shop.Controllers
{
    public class TokenController : ApiController
    {
        public IHttpActionResult Get()
        {
            var response = new TokenResponse();

            response.Token = Guid.NewGuid().ToString();

            return Ok(response);
        }
    }
}
