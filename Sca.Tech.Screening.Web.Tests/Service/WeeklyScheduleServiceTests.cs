using NUnit.Framework;
using Sca.Tech.Screening.Web.Data.Database.Entity;
using Sca.Tech.Screening.Web.Domain.Query.Schedules;
using System.Linq;

namespace Sca.Tech.Screening.Service.Tests
{
    [TestFixture]
    [Category("ScaScheduleContextTests")]
    public class WeeklyScheduleServiceTests
    {
        [Test]
        public void GetWeeklySchedulesByFacilityIdAndStartDater_WhenCalledWithAValidDate_Returns10Records()
        {
            using (var context = new ScaScheduleContext())
            {
                // arrange
                var queryHandler = new GetSchedulesByFacilityAndStartDateQueryHandler(context);

                // act
                var actual = queryHandler.Handle(new GetSchedulesByFacilityAndStartDateQuery{ FacilityId = 1, StartDate = new System.DateTime(2018, 1, 1) });

                // assert
                Assert.AreEqual(actual.Count(), 10);
            }
        }

        [Test]
        public void GetSchedulesByFacilityAndStartDateQueryHandler_WhenQueriedForAWeeklyScheduleWithAnInvalidDate_ReturnsNoRecords()
        {
            using (var context = new ScaScheduleContext())
            {
                // arrange
                var queryHandler = new GetSchedulesByFacilityAndStartDateQueryHandler(context);

                // act
                var actual = queryHandler.Handle(new GetSchedulesByFacilityAndStartDateQuery{ FacilityId = 1, StartDate = new System.DateTime(2017, 1, 1) });

                // assert
                Assert.IsFalse(actual.Any());
            }
        }
    }
}
