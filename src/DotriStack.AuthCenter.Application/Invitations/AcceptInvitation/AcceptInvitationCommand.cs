using MediatR;

namespace DotriStack.AuthCenter.Application.Invitations.AcceptInvitation;

public sealed record AcceptInvitationCommand(Guid GatheringId, Guid InvitationId) : IRequest;