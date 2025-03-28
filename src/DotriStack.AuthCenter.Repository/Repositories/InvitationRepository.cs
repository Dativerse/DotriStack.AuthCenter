﻿using DotriStack.AuthCenter.Domain.Entities;
using DotriStack.AuthCenter.Domain.Repositories;

namespace DotriStack.AuthCenter.Repository.Repositories;

internal sealed class InvitationRepository : IInvitationRepository
{
    private readonly ApplicationDbContext _dbContext;

    public InvitationRepository(ApplicationDbContext dbContext) =>
        _dbContext = dbContext;

    public void Add(Invitation invitation) =>
        _dbContext.Set<Invitation>().Remove(invitation);
}
