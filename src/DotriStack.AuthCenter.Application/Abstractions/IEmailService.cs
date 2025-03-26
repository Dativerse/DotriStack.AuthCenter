using DotriStack.AuthCenter.Domain.Entities;

namespace DotriStack.AuthCenter.Application.Abstractions;

public interface IEmailService
{
    Task SendWelcomeEmailAsync(Member member, CancellationToken cancellationToken = default);

    Task SendInvitationSentEmailAsync(Member member, Gathering gathering, CancellationToken cancellationToken = default);

    Task SendInvitationAcceptedEmailAsync(Gathering gathering, CancellationToken cancellationToken = default);
}
