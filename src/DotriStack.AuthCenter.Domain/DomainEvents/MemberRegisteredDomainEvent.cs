﻿namespace DotriStack.AuthCenter.Domain.DomainEvents;

public sealed record MemberRegisteredDomainEvent(Guid Id, Guid MemberId) : DomainEvent(Id);
