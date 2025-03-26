using DotriStack.AuthCenter.Domain.Entities;

namespace DotriStack.AuthCenter.Domain.Repositories;

public interface IInvitationRepository
{
    void Add(Invitation invitation);
}