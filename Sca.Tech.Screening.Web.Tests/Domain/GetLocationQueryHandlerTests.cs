using NUnit.Framework;
using Sca.Tech.Screening.Web.Data.Database.Entity;
using Sca.Tech.Screening.Web.Domain.Query.Locations;
using System.Linq;

namespace Sca.Tech.Screening.Domain.Tests
{
    [TestFixture]
    [Category("ScaScheduleContextTests")]
    public class GetLocationQueryHandlerTests
    {
        [Test]
        public void GetLocationQueryHandler_WhenCalled_Returns4Records()
        {
            // arrange
            using (var context = new ScaScheduleContext())
            {
                var handler = new GetLocationsQueryHandler(context);

                // act
                var actual = handler.Handle(new GetLocationsQuery());

                // assert
                Assert.AreEqual(actual.ToList().Count, 4);
            }
        }

        [Test]
        public void GetLocationQueryHandler_WhenCalled_ReturnsFacilityIdPaddedWithLeadingZeroes()
        {
            // arrange
            using (var context = new ScaScheduleContext())
            {
                var handler = new GetLocationsQueryHandler(context);

                // act
                var actual = handler.Handle(new GetLocationsQuery());

                // assert
                Assert.AreEqual(actual.ToList()[0].FacilityId.Length, 6);
                Assert.IsTrue(actual.ToList()[0].FacilityId.Contains("00000"));
            }
        }
    }
}
