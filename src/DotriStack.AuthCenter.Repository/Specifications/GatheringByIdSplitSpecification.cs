﻿using DotriStack.AuthCenter.Domain.Entities;

namespace DotriStack.AuthCenter.Repository.Specifications;

internal class GatheringByIdSplitSpecification : Specification<Gathering>
{
    public GatheringByIdSplitSpecification(Guid gatheringId)
         : base(gathering => gathering.Id == gatheringId)
    {
        AddInclude(gathering => gathering.Creator);
        AddInclude(gathering => gathering.Attendees);
        AddInclude(gathering => gathering.Invitations);

        IsSplitQuery = true;
    }
}
