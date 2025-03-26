using DotriStack.AuthCenter.Domain.Entities;
using DotriStack.AuthCenter.Domain.ValueObjects;

namespace DotriStack.AuthCenter.Domain.Repositories;

public interface IMemberRepository
{
    Task<Member?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<Member?> GetByEmailAsync(Email email, CancellationToken cancellationToken = default);

    Task<bool> IsEmailUniqueAsync(Email email, CancellationToken cancellationToken = default);

    void Add(Member member);

    void Update(Member member);
}
