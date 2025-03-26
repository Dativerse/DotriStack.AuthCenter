using DotriStack.AuthCenter.Domain.Primitives;
using MediatR;

namespace DotriStack.AuthCenter.Application.Abstractions.Messaging;

public interface IDomainEventHandler<TEvent> : INotificationHandler<TEvent>
    where TEvent : IDomainEvent
{
}
