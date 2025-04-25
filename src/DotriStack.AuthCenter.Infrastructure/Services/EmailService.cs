using DotriStack.AuthCenter.Application.Abstractions;
using DotriStack.AuthCenter.Domain.Entities;

namespace DotriStack.AuthCenter.Infrastructure.Services;

public sealed class EmailService : IEmailService
{
    public Task SendWelcomeEmailAsync(ApplicationUser user, CancellationToken cancellationToken = default) =>
        Task.CompletedTask; // TODO: Implement email sending
}
