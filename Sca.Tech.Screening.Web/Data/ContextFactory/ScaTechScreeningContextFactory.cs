using Sca.Tech.Screening.Web.Data.Database.Entity;
using System.Data.Entity.Infrastructure;

namespace Sca.Tech.Screening.Web.Data.ContextFactory
{
    public class ScaTechScreeningContextFactory : IDbContextFactory<ScaScheduleContext>
    {
        public ScaScheduleContext Create()
        {
            return new ScaScheduleContext();
        }
    }
}
