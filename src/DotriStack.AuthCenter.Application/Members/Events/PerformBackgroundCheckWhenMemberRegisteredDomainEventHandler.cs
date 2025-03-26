using DotriStack.AuthCenter.Application.Abstractions.Messaging;
using DotriStack.AuthCenter.Domain.DomainEvents;

namespace DotriStack.AuthCenter.Application.Members.Events;

internal sealed class PerformBackgroundCheckWhenMemberRegisteredDomainEventHandler
    : IDomainEventHandler<MemberRegisteredDomainEvent>
{
    public Task Handle(
        MemberRegisteredDomainEvent notification,
        CancellationToken cancellationToken) =>
        Task.CompletedTask;
}
