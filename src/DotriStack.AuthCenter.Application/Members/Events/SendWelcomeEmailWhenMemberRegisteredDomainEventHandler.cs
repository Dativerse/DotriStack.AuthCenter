﻿using DotriStack.AuthCenter.Application.Abstractions;
using DotriStack.AuthCenter.Application.Abstractions.Messaging;
using DotriStack.AuthCenter.Domain.DomainEvents;
using DotriStack.AuthCenter.Domain.Entities;
using DotriStack.AuthCenter.Domain.Repositories;

namespace DotriStack.AuthCenter.Application.Members.Events;

internal sealed class SendWelcomeEmailWhenMemberRegisteredDomainEventHandler
     : IDomainEventHandler<MemberRegisteredDomainEvent>
{
    private readonly IMemberRepository _memberRepository;
    private readonly IEmailService _emailService;

    public SendWelcomeEmailWhenMemberRegisteredDomainEventHandler(
        IMemberRepository memberRepository,
        IEmailService emailService)
    {
        _memberRepository = memberRepository;
        _emailService = emailService;
    }

    public async Task Handle(
        MemberRegisteredDomainEvent notification,
        CancellationToken cancellationToken)
    {
        Member? member = await _memberRepository.GetByIdAsync(
            notification.MemberId,
            cancellationToken);

        if (member is null)
        {
            return;
        }

        await _emailService.SendWelcomeEmailAsync(member, cancellationToken);
    }
}
