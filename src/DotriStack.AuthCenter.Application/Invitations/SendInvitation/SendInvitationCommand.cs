using MediatR;

namespace DotriStack.AuthCenter.Application.Invitations.SendInvitation;

public sealed record SendInvitationCommand(Guid MemberId, Guid GatheringId) : IRequest<Unit>;