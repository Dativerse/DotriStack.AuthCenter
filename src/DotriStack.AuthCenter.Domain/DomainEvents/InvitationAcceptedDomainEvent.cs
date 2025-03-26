namespace DotriStack.AuthCenter.Domain.DomainEvents;

public sealed record InvitationAcceptedDomainEvent(Guid Id, Guid InvitationId, Guid GatheringId) : DomainEvent(Id);
