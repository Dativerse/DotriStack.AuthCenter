﻿namespace DotriStack.AuthCenter.Domain.Entities
{
    public class Attendee
    {
        internal Attendee(Invitation invitation)
            : this()
        {
            GatheringId = invitation.GatheringId;
            MemberId = invitation.MemberId;
            CreatedOnUtc = DateTime.UtcNow;
        }

        private Attendee()
        {
        }

        public Guid GatheringId { get; private set; }

        public Guid MemberId { get; private set; }

        public DateTime CreatedOnUtc { get; private set; }
    }
}