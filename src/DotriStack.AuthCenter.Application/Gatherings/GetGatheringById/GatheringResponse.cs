﻿namespace DotriStack.AuthCenter.Application.Gatherings.GetGatheringById;

public sealed record GatheringResponse(
    Guid Id,
    string Name,
    string? Location,
    string Creator,
    IReadOnlyCollection<AttendeeResponse> Attendees,
    IReadOnlyCollection<InvitationResponse> Invitations);
