using DotriStack.AuthCenter.Domain.Entities;

namespace DotriStack.AuthCenter.Repository.Specifications;

internal class GatheringByIdWithCreatorSpecification : Specification<Gathering>
{
    public GatheringByIdWithCreatorSpecification(Guid gatheringId)
        : base(gathering => gathering.Id == gatheringId)
    {
        AddInclude(gathering => gathering.Creator);
    }
}
