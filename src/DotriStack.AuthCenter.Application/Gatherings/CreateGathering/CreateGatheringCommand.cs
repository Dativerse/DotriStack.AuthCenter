using DotriStack.AuthCenter.Domain.Enums;
using MediatR;

namespace DotriStack.AuthCenter.Application.Gatherings.CreateGathering;

public sealed record CreateGatheringCommand(
    Guid MemberId,
    GatheringType Type,
    DateTime ScheduledAtUtc,
    string Name,
    string? Location,
    int? MaximumNumberOfAttendees,
    int? InvitationsValidBeforeInHours) : IRequest;