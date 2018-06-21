using System.Collections.Generic;

namespace Sca.Tech.Screening.Web.Data.Database.Entity
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }

        public int FacilityId { get; set; }
        public virtual Facility Facility { get; set; }

        public ICollection<Schedule> SchedulesEmployees { get; set; }

        public Employee()
        {
            SchedulesEmployees = new HashSet<Schedule>();
        }
    }
}
