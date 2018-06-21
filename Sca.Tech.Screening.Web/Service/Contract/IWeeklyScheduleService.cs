using Sca.Tech.Screening.Web.Models;
using System;
using System.Collections.Generic;

namespace Sca.Tech.Screening.Service.Contract
{
    public interface IWeeklyScheduleService
    {
        IEnumerable<WeeklySchedule> GetWeeklySchedulesByFacilityIdAndStartDate(int facilityId, DateTime startDate);
    }
}
