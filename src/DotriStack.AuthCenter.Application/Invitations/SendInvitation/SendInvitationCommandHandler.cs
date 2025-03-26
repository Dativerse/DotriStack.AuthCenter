using DotriStack.AuthCenter.Application.Abstractions;
using DotriStack.AuthCenter.Domain.Entities;
using DotriStack.AuthCenter.Domain.Repositories;
using DotriStack.AuthCenter.Domain.Shared;
using MediatR;

namespace DotriStack.AuthCenter.Application.Invitations.SendInvitation;

internal sealed class SendInvitationCommandHandler : IRequestHandler<SendInvitationCommand, Unit>
{
    private readonly IMemberRepository _memberRepository;
    private readonly IGatheringRepository _gatheringRepository;
    private readonly IInvitationRepository _invitationRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IEmailService _emailService;

    public SendInvitationCommandHandler(
        IMemberRepository memberRepository,
        IGatheringRepository gatheringRepository,
        IInvitationRepository invitationRepository,
        IUnitOfWork unitOfWork,
        IEmailService emailService)
    {
        _memberRepository = memberRepository;
        _gatheringRepository = gatheringRepository;
        _invitationRepository = invitationRepository;
        _unitOfWork = unitOfWork;
        _emailService = emailService;
    }

    public async Task<Unit> Handle(SendInvitationCommand request, CancellationToken cancellationToken)
    {
        var member = await _memberRepository.GetByIdAsync(request.MemberId, cancellationToken);

        var gathering = await _gatheringRepository.GetByIdWithCreatorAsync(request.GatheringId, cancellationToken);

        if (member is null || gathering is null)
        {
            return Unit.Value;
        }

        Result<Invitation> invitationResult = gathering.SendInvitation(member);

        if (invitationResult.IsFailure)
        {
            // Log error
            return Unit.Value;
        }

        _invitationRepository.Add(invitationResult.Value);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Send email
        await _emailService.SendInvitationSentEmailAsync(
            member,
            gathering,
            cancellationToken);

        return Unit.Value;
    }
}