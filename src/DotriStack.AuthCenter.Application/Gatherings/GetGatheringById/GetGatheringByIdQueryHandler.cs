using DotriStack.AuthCenter.Application.Abstractions.Messaging;
using DotriStack.AuthCenter.Domain.Entities;
using DotriStack.AuthCenter.Domain.Errors;
using DotriStack.AuthCenter.Domain.Repositories;
using DotriStack.AuthCenter.Domain.Shared;

namespace DotriStack.AuthCenter.Application.Gatherings.GetGatheringById;

internal sealed class GetGatheringByIdQueryHandler
    : IQueryHandler<GetGatheringByIdQuery, GatheringResponse>
{
    private readonly IGatheringRepository _gatheringRepository;

    public GetGatheringByIdQueryHandler(IGatheringRepository gatheringRepository) =>
        _gatheringRepository = gatheringRepository;

    public async Task<Result<GatheringResponse>> Handle(
        GetGatheringByIdQuery request,
        CancellationToken cancellationToken)
    {
        Gathering? gathering = await _gatheringRepository.GetByIdAsync(
            request.GatheringId,
            cancellationToken);

        if (gathering is null)
        {
            return Result.Failure<GatheringResponse>(
                DomainErrors.Gathering.NotFound(request.GatheringId));
        }

        var response = new GatheringResponse(
            gathering.Id,
            gathering.Name,
            gathering.Location,
            $"{gathering.Creator.FirstName.Value}" +
            $" {gathering.Creator.LastName.Value}",
            gathering
                .Attendees
                .Select(attendee => new AttendeeResponse(
                    attendee.MemberId,
                    attendee.CreatedOnUtc))
                .ToList(),
            gathering
                .Invitations
                .Select(invitation => new InvitationResponse(
                    invitation.Id,
                    invitation.Status))
                .ToList());

        return response;
    }
}
