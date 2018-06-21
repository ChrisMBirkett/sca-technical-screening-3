using NUnit.Framework;
using Sca.Tech.Screening.Web.Data.Database.Entity;
using Sca.Tech.Screening.Web.Domain.Query.Locations;
using System.Linq;

namespace Sca.Tech.Screening.Service.Tests
{
    [TestFixture]
    [Category("ScaScheduleContextTests")]
    public class LocationServiceTests
    {
        [Test]
        public void GetLocations_WhenCalled_Returns4Records()
        {
            using (var context = new ScaScheduleContext())
            {
                // arrange
                var queryHandler = new GetLocationsQueryHandler(context);

                // act
                var actual = queryHandler.Handle(new GetLocationsQuery());

                // assert
                Assert.AreEqual(actual.Count(), 4);
            }
        }
    }
}
