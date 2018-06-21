using NUnit.Framework;
using Sca.Tech.Screening.Web.Data.ContextFactory;

namespace Sca.Tech.Screening.Data.Tests
{
    [TestFixture]
    [Category("ScaScheduleContextTests")]
    public class ScaTechScreeningContextFactoryTests
    {
        [Test]
        public void Create_WhenCAlled_ReturnsAHydratedObject()
        {
            // arrange
            var contextFactory = new ScaTechScreeningContextFactory();

            // act
            var context = contextFactory.Create();

            // assert
            Assert.IsNotNull(context);
        }
    }
}
