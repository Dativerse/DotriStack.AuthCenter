using DotriStack.AuthCenter.Domain.Shared;
using MediatR;

namespace DotriStack.AuthCenter.Application.Abstractions.Messaging;

public interface IQueryHandler<TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>> where TQuery : IQuery<TResponse>
{
}