﻿using DotriStack.AuthCenter.Application.Abstractions;
using DotriStack.AuthCenter.Domain.Entities;

namespace DotriStack.AuthCenter.Infrastructure.Services;

internal sealed class EmailService : IEmailService
{
    public Task SendWelcomeEmailAsync(Member member, CancellationToken cancellationToken = default) =>
        Task.CompletedTask;

    public Task SendInvitationSentEmailAsync(Member member, Gathering gathering, CancellationToken cancellationToken = default) =>
        Task.CompletedTask;

    public Task SendInvitationAcceptedEmailAsync(Gathering gathering, CancellationToken cancellationToken = default) =>
        Task.CompletedTask;
}
