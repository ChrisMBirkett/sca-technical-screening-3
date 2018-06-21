using Newtonsoft.Json.Serialization;
using Sca.Tech.Screening.Web.App_Start;
using System;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Sca.Tech.Screening.Web
{
  public class Global : System.Web.HttpApplication
  {

    protected void Application_Start(object sender, EventArgs e)
    {
      GlobalConfiguration.Configure(WebApiConfig.Register);

      var config = GlobalConfiguration.Configuration;
      config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
      config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
    }
  }
}
