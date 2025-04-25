using DotriStack.AuthCenter.Domain.Entities;

namespace DotriStack.AuthCenter.Application.Abstractions;

public interface IEmailService
{
    Task SendWelcomeEmailAsync(ApplicationUser user, CancellationToken cancellationToken = default);
}
