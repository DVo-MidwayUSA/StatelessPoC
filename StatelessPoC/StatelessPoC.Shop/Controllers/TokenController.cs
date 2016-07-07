using StatelessPoC.Shop.Models;
using System;
using System.Web.Http;
using System.Web.Http.Cors;

namespace StatelessPoC.Shop.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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
