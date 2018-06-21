using Sca.Tech.Screening.Service.Contract;
using Sca.Tech.Screening.Web.Models;
using System;
using System.Web.Http;

namespace Sca.Tech.Screening.Web.Controllers
{
  public class LocationController : ApiController
  {
    private ILocationService _locationService;

    public LocationController(ILocationService locationService)
    {
      _locationService = locationService ?? throw new ArgumentNullException(nameof(locationService));
    }

    [HttpGet]
    [Route("api/locations")]
    public IHttpActionResult GetLocations()
    {
      try
      {
        return Ok(new LocationResultModel { Data = _locationService.GetLocations() });
      }
      catch
      {
        return BadRequest();
      }
    }
  }
}
