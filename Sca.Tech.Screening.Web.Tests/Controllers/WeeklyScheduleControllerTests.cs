using NUnit.Framework;
using Sca.Tech.Screening.Service;
using Sca.Tech.Screening.Web.Controllers;
using Sca.Tech.Screening.Web.Data.Database.Entity;
using Sca.Tech.Screening.Web.Domain.Query.Schedules;
using Sca.Tech.Screening.Web.Models;
using System.Linq;
using System.Web.Http.Results;

namespace Sca.Tech.Screening.Web.Tests.Controllers
{
    [TestFixture]
    [Category("WeeklyScheduleControllerTests")]
    public class WeeklyScheduleControllerTests
    {
        [Test]
        public void GetWeeklySchedule_WhenCalledWithValidDate_Returns10Schedules()
        {
            var weeklyScheduleController = new WeeklyScheduleController(new WeeklyScheduleService(new GetSchedulesByFacilityAndStartDateQueryHandler(new ScaScheduleContext())));

            var result = weeklyScheduleController.GetWeeklySchedule(1, new System.DateTime(2018, 1, 1));

            var actual = ((OkNegotiatedContentResult<WeeklyScheduleResultModel>)result).Content;

            Assert.AreEqual(actual.Data.Count(), 10);
        }

        [Test]
        public void GetWeeklySchedule_WhenCalledWithInvalidDate_Returns10Schedules()
        {
            var weeklyScheduleController = new WeeklyScheduleController(new WeeklyScheduleService(new GetSchedulesByFacilityAndStartDateQueryHandler(new ScaScheduleContext())));

            var result = weeklyScheduleController.GetWeeklySchedule(1, new System.DateTime(2017, 1, 1));

            var actual = ((OkNegotiatedContentResult<WeeklyScheduleResultModel>)result).Content;

            Assert.IsFalse(actual.Data.Any());
        }
    }
}
