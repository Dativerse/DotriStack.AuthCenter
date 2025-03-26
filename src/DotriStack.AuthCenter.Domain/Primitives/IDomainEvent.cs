using MediatR;

namespace DotriStack.AuthCenter.Domain.Primitives;

public interface IDomainEvent : INotification
{
    public Guid Id { get; init; }
}
