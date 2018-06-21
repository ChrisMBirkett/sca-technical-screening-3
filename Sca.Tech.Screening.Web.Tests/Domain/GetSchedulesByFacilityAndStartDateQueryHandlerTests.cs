using NUnit.Framework;
using Sca.Tech.Screening.Web.Data.Database.Entity;
using Sca.Tech.Screening.Web.Domain.Query.Schedules;
using System;
using System.Linq;

namespace Sca.Tech.Screening.Domain.Tests
{
    [TestFixture]
    [Category("ScaScheduleContextTests")]
    public class GetSchedulesByFacilityAndStartDateQueryHandlerTests
    {
        [Test]
        public void GetSchedulesByFacilityAndStartDateQueryHandler_WhenCalledWithAValidDate_Returns10Records()
        {
            // arrange
            using (var context = new ScaScheduleContext())
            {
                var handler = new GetSchedulesByFacilityAndStartDateQueryHandler(context);

                var query = new GetSchedulesByFacilityAndStartDateQuery
                {
                    FacilityId = 1,
                    StartDate = new DateTime(2018, 1, 1)
                };

                // act
                var actual = handler.Handle(query);

                // assert
                Assert.AreEqual(actual.ToList().Count, 10);
            }
        }

        [Test]
        public void GetSchedulesByFacilityAndStartDateQueryHandler_WhenQueriedForAWeeklyScheduleWithAnInvalidDate_ReturnsNoRecords()
        {
            // arrange
            using (var context = new ScaScheduleContext())
            {
                var handler = new GetSchedulesByFacilityAndStartDateQueryHandler(context);

                var query = new GetSchedulesByFacilityAndStartDateQuery
                {
                    FacilityId = 1,
                    StartDate = new DateTime(2017, 1, 1)
                };

                // act
                var actual = handler.Handle(query);

                // assert
                Assert.IsFalse(actual.Any());
            }
        }
    }
}
