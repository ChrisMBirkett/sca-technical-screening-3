using Sca.Tech.Screening.Web.Models;
using Sca.Tech.Screening.Web.Data.Database.Entity;
using Sca.Tech.Screening.Web.Domain.Query.Contract;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Sca.Tech.Screening.Web.Domain.Query.Locations
{
    public class GetLocationsQueryHandler : IQueryHandler<GetLocationsQuery, IEnumerable<Location>>
    {
        private readonly ScaScheduleContext _context;

        public GetLocationsQueryHandler(ScaScheduleContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(ScaScheduleContext));
        }

        public IEnumerable<Location> Handle(GetLocationsQuery query)
        {
            var facilityIdFormat = "000000";
            return _context.Facilities
                .Select(f => new Location { Id = f.FacilityId, FacilityName = f.Name })
                .ToList();
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
