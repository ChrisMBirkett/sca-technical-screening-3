using Autofac;
using Sca.Tech.Screening.Web.Domain.Query.Contract;

namespace Sca.Tech.Screening.Web.Domain.Query
{
    public sealed class QueryProcessor : IQueryProcessor
    {
        #region Private Members

        private readonly ILifetimeScope _container;

        #endregion Private Members

        #region Constructors

        public QueryProcessor(ILifetimeScope container)
        {
            _container = container;
        }

        #endregion Constructors

        #region IQueryProcessor Implementation

        //[DebuggerStepThrough]
        public TResult Process<TResult>(IQuery<TResult> query)
        {
            var handlerType = typeof(IQueryHandler<,>).MakeGenericType(query.GetType(), typeof(TResult));

            dynamic handler = _container.Resolve(handlerType);

            var result = handler.Handle((dynamic)query);

            handler.Dispose();

            return result;
        }

        #endregion IQueryProcessor Implementation
    }
}
