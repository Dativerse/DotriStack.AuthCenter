using DotriStack.AuthCenter.Domain.Entities;
using DotriStack.AuthCenter.Repository.Constants;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DotriStack.AuthCenter.Repository.Configurations;

internal sealed class GatheringConfiguration : IEntityTypeConfiguration<Gathering>
{
    public void Configure(EntityTypeBuilder<Gathering> builder)
    {
        builder.ToTable(TableNames.Gatherings);

        builder.HasKey(x => x.Id);

        builder
            .HasOne(x => x.Creator)
            .WithMany();

        builder
            .HasMany(x => x.Invitations)
            .WithOne()
            .HasForeignKey(x => x.GatheringId);

        builder
            .HasMany(x => x.Attendees)
            .WithOne()
            .HasForeignKey(x => x.GatheringId);
    }
}
