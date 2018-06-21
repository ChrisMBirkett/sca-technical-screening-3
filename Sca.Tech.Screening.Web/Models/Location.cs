using System.Web.Script.Serialization;

namespace Sca.Tech.Screening.Web.Models
{
    public class Location
    {
        [ScriptIgnore]
        public int Id { get; set; }
        public string FacilityId {
            get
            {
                return Id.ToString("000000");
            }
        }
        public string FacilityName { get; set; }
    }
}
