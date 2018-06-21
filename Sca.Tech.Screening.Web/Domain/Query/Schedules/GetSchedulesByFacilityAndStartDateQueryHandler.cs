using Sca.Tech.Screening.Web.Data.Database.Entity;
using Sca.Tech.Screening.Web.Domain.Query.Contract;
using Sca.Tech.Screening.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Sca.Tech.Screening.Web.Domain.Query.Schedules
{
    public class GetSchedulesByFacilityAndStartDateQueryHandler : IQueryHandler<GetSchedulesByFacilityAndStartDateQuery, IEnumerable<WeeklySchedule>>
    {
        private readonly ScaScheduleContext _context;

        public GetSchedulesByFacilityAndStartDateQueryHandler(ScaScheduleContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(ScaScheduleContext));
        }

        public IEnumerable<WeeklySchedule> Handle(GetSchedulesByFacilityAndStartDateQuery query)
        {
            var weeklySchedule =
                    from e in _context.Employees
                    where e.FacilityId == query.FacilityId
                    from s in e.SchedulesEmployees
                    where s.StartDate == query.StartDate
                    select new WeeklySchedule {
                        TeammateName = e.Name,
                        TeammateType = e.Type,
                        Monday = s.Monday,
                        Tuesday = s.Tuesday,
                        Wednesday = s.Wednesday,
                        Thursday = s.Thursday,
                        Friday = s.Friday,
                        Saturday = s.Saturday,
                        Sunday = s.Sunday
                    };

            return weeklySchedule.ToList();
        }

        private bool disposed = false;

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_context != null) _context.Dispose();
            }
            disposed = true;
        }
    }
}
