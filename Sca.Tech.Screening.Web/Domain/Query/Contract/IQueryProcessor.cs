namespace Sca.Tech.Screening.Web.Domain.Query.Contract
{
    public interface IQueryProcessor
    {
        TResult Process<TResult>(IQuery<TResult> query);
    }
}
