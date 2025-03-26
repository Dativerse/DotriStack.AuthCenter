using DotriStack.AuthCenter.Domain.Shared;
using MediatR;

namespace DotriStack.AuthCenter.Application.Abstractions.Messaging;

public interface IQuery<TResponse> : IRequest<Result<TResponse>>
{
}