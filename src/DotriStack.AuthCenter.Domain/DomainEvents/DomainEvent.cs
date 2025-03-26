using DotriStack.AuthCenter.Domain.Primitives;

namespace DotriStack.AuthCenter.Domain.DomainEvents;

public abstract record DomainEvent(Guid Id) : IDomainEvent;
