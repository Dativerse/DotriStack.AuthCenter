using DotriStack.AuthCenter.Domain.Shared;
using MediatR;

namespace DotriStack.AuthCenter.Application.Abstractions.Messaging;

public interface ICommand : IRequest<Result>
{
}

public interface ICommand<TResponse> : IRequest<Result<TResponse>>
{
}
