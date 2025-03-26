using DotriStack.AuthCenter.Application.Abstractions;
using DotriStack.AuthCenter.Application.Abstractions.Messaging;
using DotriStack.AuthCenter.Domain.DomainEvents;
using DotriStack.AuthCenter.Domain.Repositories;

namespace DotriStack.AuthCenter.Application.Invitations.Events;

internal sealed class InvitationAcceptedDomainEventHandler : IDomainEventHandler<InvitationAcceptedDomainEvent>
{
    private readonly IEmailService _emailService;
    private readonly IGatheringRepository _gatheringRepository;

    public InvitationAcceptedDomainEventHandler(
        IEmailService emailService,
        IGatheringRepository gatheringRepository)
    {
        _emailService = emailService;
        _gatheringRepository = gatheringRepository;
    }

    public async Task Handle(InvitationAcceptedDomainEvent notification, CancellationToken cancellationToken)
    {
        var gathering = await _gatheringRepository.GetByIdWithCreatorAsync(
            notification.GatheringId, cancellationToken);

        if (gathering is null)
        {
            return;
        }

        await _emailService.SendInvitationAcceptedEmailAsync(
            gathering,
            cancellationToken);
    }
}
