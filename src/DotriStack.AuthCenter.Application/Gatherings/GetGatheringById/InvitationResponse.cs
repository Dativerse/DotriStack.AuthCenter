using DotriStack.AuthCenter.Domain.Enums;

namespace DotriStack.AuthCenter.Application.Gatherings.GetGatheringById;

public sealed record InvitationResponse(Guid InvitationId, InvitationStatus Status);
