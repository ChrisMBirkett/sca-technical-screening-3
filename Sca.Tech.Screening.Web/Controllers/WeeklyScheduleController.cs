using Sca.Tech.Screening.Service.Contract;
using Sca.Tech.Screening.Web.Models;
using System;
using System.Web.Http;

namespace Sca.Tech.Screening.Web.Controllers
{
  public class WeeklyScheduleController : ApiController
  {
    private IWeeklyScheduleService _weeklyScheduleService;

    public WeeklyScheduleController(IWeeklyScheduleService weeklyScheduleService)
    {
      _weeklyScheduleService = weeklyScheduleService ?? throw new ArgumentNullException(nameof(weeklyScheduleService));
    }

    [HttpGet]
    [Route("api/schedules/{facilityId:int}/{day:datetime}")]
    public IHttpActionResult GetWeeklySchedule(int facilityId, DateTime day)
    {
      try
      {
        return Ok(new WeeklyScheduleResultModel { Data = _weeklyScheduleService.GetWeeklySchedulesByFacilityIdAndStartDate(facilityId, day) });
      }
      catch
      {
        return BadRequest();
      }
    }
  }
}
