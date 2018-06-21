using Autofac;
using Autofac.Integration.WebApi;
using Sca.Tech.Screening.Service;
using Sca.Tech.Screening.Service.Contract;
using Sca.Tech.Screening.Web.Data.ContextFactory;
using Sca.Tech.Screening.Web.Data.Database.Entity;
using Sca.Tech.Screening.Web.Domain.Query;
using Sca.Tech.Screening.Web.Domain.Query.Contract;
using Sca.Tech.Screening.Web.Domain.Query.Locations;
using Sca.Tech.Screening.Web.Domain.Query.Schedules;
using Sca.Tech.Screening.Web.Models;
using Sca.Tech.Screening.Web.Service;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Reflection;
using System.Web.Http;

namespace Sca.Tech.Screening.Web.App_Start
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      // Web API configuration and services

      // Web API routes
      config.MapHttpAttributeRoutes();

      config.Routes.MapHttpRoute(
        name: "DefaultApi",
        routeTemplate: "api/{controller}/{id}",
        defaults: new { id = RouteParameter.Optional }
      );

      ConfigureCompositionRoot(config);
    }

    private static void ConfigureCompositionRoot(HttpConfiguration config)
    {
      var builder = new ContainerBuilder();

      /*
      * Data Layer
      */
      builder.RegisterType<ScaTechScreeningContextFactory>()
      .As<IDbContextFactory<ScaScheduleContext>>()
      .InstancePerRequest();

      builder.Register(context => context.Resolve<IDbContextFactory<ScaScheduleContext>>().Create())
      .As<ScaScheduleContext>()
      .InstancePerRequest();

      /*
      * Domain Layer
      */

      /*
      * Queries
      */
      builder.RegisterType<GetLocationsQueryHandler>()
      .As<IQueryHandler<GetLocationsQuery, IEnumerable<Location>>>()
      .InstancePerRequest();

      builder.RegisterType<GetSchedulesByFacilityAndStartDateQueryHandler>()
      .As<IQueryHandler<GetSchedulesByFacilityAndStartDateQuery, IEnumerable<WeeklySchedule>>>()
      .InstancePerRequest();

      /*
      * Query Processor
      */
      builder.RegisterType<QueryProcessor>()
      .As<IQueryProcessor>()
      .InstancePerRequest();

      /*
      * Service Layer
      */
      builder.RegisterType<LocationService>()
      .As<ILocationService>()
      .OwnedByLifetimeScope()
      .InstancePerRequest();

      builder.RegisterType<WeeklyScheduleService>()
      .As<IWeeklyScheduleService>()
      .InstancePerRequest();

      builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

      var container = builder.Build();
      config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
    }
  }
}
