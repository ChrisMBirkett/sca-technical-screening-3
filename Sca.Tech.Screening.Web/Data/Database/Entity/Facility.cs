using System.Collections.Generic;

namespace Sca.Tech.Screening.Web.Data.Database.Entity
{
    public class Facility
    {
        public int FacilityId { get; set; }
        public string Name { get; set; }

        public virtual List<Employee> Employees { get; set; }
    }
}
