using System;

namespace Sca.Tech.Screening.Web.Domain.Query.Contract
{
    /// <summary>
    /// Defines a handler that takes in a query object and returns the defined type
    /// for that query.
    /// </summary>
    /// <typeparam name="TQuery">The query that this query handler can process.</typeparam>
    /// <typeparam name="TResult">The type of the data that will be returned from this query.</typeparam>
    public interface IQueryHandler<TQuery, TResult> : IDisposable
    where TQuery : IQuery<TResult>
    {
        /// <summary>
        /// Executes the <paramref name="query"/>, and returns the associated results.
        /// </summary>
        /// <param name="query">The query to handle.</param>
        /// <returns><see cref="TResult"/> as the result of the executed query.</returns>
        TResult Handle(TQuery query);
    }
}
