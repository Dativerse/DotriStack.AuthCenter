using DotriStack.AuthCenter.Domain.Entities;
using DotriStack.AuthCenter.Repository.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotriStack.AuthCenter.Repository.Configurations;

internal sealed class AttendeeConfiguration : IEntityTypeConfiguration<Attendee>
{
    public void Configure(EntityTypeBuilder<Attendee> builder)
    {
        builder.ToTable(TableNames.Attendees);

        builder.HasKey(x => new { x.GatheringId, x.MemberId });

        builder
            .HasOne<Member>()
            .WithMany()
            .HasForeignKey(x => x.MemberId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
