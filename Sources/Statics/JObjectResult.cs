using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Alkemic.PortfolioWeb
{
    public class JObjectResult : ActionResult
    {
        private readonly JObject jObject;

        public JObjectResult(object obj)
        {
            this.jObject = JObject.FromObject(obj);
        }

        public JObjectResult(JObject jObject)
        {
            this.jObject = jObject;
        }

        public override Task ExecuteResultAsync(ActionContext context)
        {
            var response = context.HttpContext.Response;
            response.ContentType = "application/json";
            return response.WriteAsync(this.jObject.ToString(Newtonsoft.Json.Formatting.None));
        }
    }
}
