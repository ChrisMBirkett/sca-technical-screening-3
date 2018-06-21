using NUnit.Framework;
using Sca.Tech.Screening.Web.Controllers;
using Sca.Tech.Screening.Web.Data.Database.Entity;
using Sca.Tech.Screening.Web.Domain.Query.Locations;
using Sca.Tech.Screening.Web.Models;
using Sca.Tech.Screening.Web.Service;
using System.Linq;
using System.Web.Http.Results;

namespace Sca.Tech.Screening.Web.Tests.Controllers
{
    [TestFixture]
    [Category("LocationControllerTests")]
    public class LocationControllerTests
    {
        [Test]
        public void GetLocations_WhenCalled_Returns4Locations()
        {
            var LocationController = new LocationController(new LocationService(new GetLocationsQueryHandler(new ScaScheduleContext())));

            var result = LocationController.GetLocations();

            var actual = ((OkNegotiatedContentResult<LocationResultModel>)result).Content;

            Assert.AreEqual(actual.Data.Count(), 4);
        }
    }
}
