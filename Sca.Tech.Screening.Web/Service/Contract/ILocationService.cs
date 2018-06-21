using Sca.Tech.Screening.Web.Models;
using System.Collections.Generic;

namespace Sca.Tech.Screening.Service.Contract
{
    public interface ILocationService
    {
        IEnumerable<Location> GetLocations();
    }
}
