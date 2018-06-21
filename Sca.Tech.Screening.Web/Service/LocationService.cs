using Sca.Tech.Screening.Web.Domain.Query.Contract;
using Sca.Tech.Screening.Web.Domain.Query.Locations;
using Sca.Tech.Screening.Web.Models;
using Sca.Tech.Screening.Service.Contract;
using System;
using System.Collections.Generic;

namespace Sca.Tech.Screening.Web.Service
{
    public class LocationService : ILocationService
    {
        private IQueryHandler<GetLocationsQuery, IEnumerable<Location>> _getLocationsQueryHandler;

        public LocationService(IQueryHandler<GetLocationsQuery, IEnumerable<Location>> getLocationsQueryHandler)
        {
            _getLocationsQueryHandler = getLocationsQueryHandler ?? throw new ArgumentNullException(nameof(getLocationsQueryHandler));
        }

        public IEnumerable<Location> GetLocations()
        {
            try
            {
                return _getLocationsQueryHandler.Handle(new GetLocationsQuery());
            }
            catch (Exception ex)
            {
                throw new Exception("Attempt to get locations failed.", ex);
            }
        }        
    }
}
