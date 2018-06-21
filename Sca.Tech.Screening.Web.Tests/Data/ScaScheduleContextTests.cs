using NUnit.Framework;
using Sca.Tech.Screening.Web.Data.Database.Entity;
using System;
using System.Linq;

namespace Sca.Tech.Screening.Data.Tests
{
    [TestFixture]
    [Category("ScaScheduleContextTests")]
    public class ScaScheduleContextTests
    {
        [SetUp]
        public void Setup()
        {
            
        }

        [Test]
        public void ScaScheduleContext_WhenInitialized_ReturnsAHydratedObject()
        {
            // assert
            Assert.IsNotNull(new ScaScheduleContext());
        }

        [Test]
        public void ScaScheduleContext_WhenQueriedForFacilities_4RecordsAreReturned()
        {
            // arrange
            using (var context = new ScaScheduleContext())
            {

                // act
                var factilities = context.Facilities.ToList();

                // assert
                Assert.AreEqual(factilities.Count, 4);
            }
        }

        [Test]
        public void ScaScheduleContext_WhenQueriedForEmployees_40RecordsAreReturned()
        {
            // arrange
            using (var context = new ScaScheduleContext())
            {

                // act
                var factilities = context.Employees.ToList();

                // assert
                Assert.AreEqual(factilities.Count, 40);
            }
        }

        [Test]
        public void ScaScheduleContext_WhenQueriedForEmployeesInAFacility_Returns10Records()
        {
            // arrange
            using (var context = new ScaScheduleContext())
            {
                // act
                var employees = 
                    from f in context.Facilities
                    join e in context.Employees on f.FacilityId equals e.FacilityId
                    where f.FacilityId == 1
                    select new { Facility = f.Name, Employee = e.Name };

                // assert
                Assert.AreEqual(employees.ToList().Count, 10);
            }
        }

        [Test]
        public void ScaScheduleContext_WhenQueriedForAWeeklyScheduleWithAValidDate_Returns10Records()
        {
            // arrange
            using (var context = new ScaScheduleContext())
            {
                // act
                var weeklySchedule =
                    from e in context.Employees
                    where e.FacilityId == 2
                    from s in e.SchedulesEmployees
                    where s.StartDate == new DateTime(2018, 1, 1)
                    select new { TeammateName = e.Name, EmployeeType = e.Type, Monday = s.Monday, Tuesday = s.Tuesday, Wednesday = s.Wednesday, Thursday = s.Thursday, Friday = s.Friday, Saturday = s.Saturday, Sunday = s.Sunday };

                // assert
                Assert.AreEqual(weeklySchedule.ToList().Count, 10);
            }
        }

        [Test]
        public void ScaScheduleContext_WhenQueriedForAWeeklyScheduleWithAnInvalidDate_ReturnsNoRecords()
        {
            // arrange
            using (var context = new ScaScheduleContext())
            {
                // act
                var weeklySchedule =
                    from e in context.Employees
                    where e.FacilityId == 2
                    from s in e.SchedulesEmployees
                    where s.StartDate == new DateTime(2017, 1, 1)
                    select new { TeammateName = e.Name, EmployeeType = e.Type, Monday = s.Monday, Tuesday = s.Tuesday, Wednesday = s.Wednesday, Thursday = s.Thursday, Friday = s.Friday, Saturday = s.Saturday, Sunday = s.Sunday };

                // assert
                Assert.IsFalse(weeklySchedule.Any());
            }
        }
    }
}
