using System;
using System.Collections.Generic;

namespace Sca.Tech.Screening.Web.Data.Database.Entity
{
    public class Schedule
    {
        public int ScheduleId { get; set; }
        public DateTime StartDate { get; set; }
        public string Monday { get; set; }
        public string Tuesday { get; set; }
        public string Wednesday { get; set; }
        public string Thursday { get; set; }
        public string Friday { get; set; }
        public string Saturday { get; set; }
        public string Sunday { get; set; }

        public ICollection<Employee> EmployeesSchedules { get; set; }

        public Schedule()
        {
            EmployeesSchedules = new HashSet<Employee>();
        }
    }
}
