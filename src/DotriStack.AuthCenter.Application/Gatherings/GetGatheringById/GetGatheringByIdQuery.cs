using DotriStack.AuthCenter.Application.Abstractions.Messaging;

namespace DotriStack.AuthCenter.Application.Gatherings.GetGatheringById;

public sealed record GetGatheringByIdQuery(Guid GatheringId) : IQuery<GatheringResponse>;
