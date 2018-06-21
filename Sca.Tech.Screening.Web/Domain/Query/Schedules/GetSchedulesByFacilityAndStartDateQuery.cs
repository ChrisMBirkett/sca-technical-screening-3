using Sca.Tech.Screening.Web.Domain.Query.Contract;
using Sca.Tech.Screening.Web.Models;
using System;
using System.Collections.Generic;

namespace Sca.Tech.Screening.Web.Domain.Query.Schedules
{
    public class GetSchedulesByFacilityAndStartDateQuery : IQuery<IEnumerable<WeeklySchedule>>
    {
        public int FacilityId { get; set; }
        public DateTime StartDate { get; set; }
    }
}
