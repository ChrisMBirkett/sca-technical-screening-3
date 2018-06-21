using System.Data.Entity;

namespace Sca.Tech.Screening.Web.Data.Database.Entity
{
    public class ScaScheduleContext : DbContext
    {
        public DbSet<Facility> Facilities { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Schedule> Schedules { get; set; }

        public ScaScheduleContext() : base("ScaScheduleContext") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Facility>().ToTable("Facility");
            modelBuilder.Entity<Employee>().ToTable("Employee");
            modelBuilder.Entity<Schedule>().ToTable("Schedule");

            modelBuilder.Entity<Employee>()
                .HasMany(e => e.SchedulesEmployees)
                .WithMany(s => s.EmployeesSchedules)
                .Map(
                    m =>
                    {
                        m.MapLeftKey("EmployeeId"); // EmployeeId
                        m.MapRightKey("ScheduleId"); // ScheduleId
                        m.ToTable("EmployeeSchedule");
                    }
                );
        }
    }
}
