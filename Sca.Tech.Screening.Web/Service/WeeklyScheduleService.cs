using Sca.Tech.Screening.Web.Domain.Query.Contract;
using Sca.Tech.Screening.Web.Domain.Query.Schedules;
using Sca.Tech.Screening.Web.Models;
using Sca.Tech.Screening.Service.Contract;
using System;
using System.Collections.Generic;

namespace Sca.Tech.Screening.Service
{
    public class WeeklyScheduleService : IWeeklyScheduleService
    {
        private IQueryHandler<GetSchedulesByFacilityAndStartDateQuery, IEnumerable<WeeklySchedule>> _queryHandler;

        public WeeklyScheduleService(IQueryHandler<GetSchedulesByFacilityAndStartDateQuery, IEnumerable<WeeklySchedule>> queryHandler)
        {
            _queryHandler = queryHandler ?? throw new ArgumentNullException(nameof(queryHandler));
        }

        public IEnumerable<WeeklySchedule> GetWeeklySchedulesByFacilityIdAndStartDate(int facilityId, DateTime startDate)
        {
            try
            {
                return _queryHandler.Handle(new GetSchedulesByFacilityAndStartDateQuery { FacilityId = facilityId, StartDate = startDate });
            }
            catch (Exception ex)
            {
                throw new Exception("Attempt to get weekly schedules failed.", ex);
            }
        }
    }
}
