using DotriStack.AuthCenter.Domain.Entities;

namespace DotriStack.AuthCenter.Application.Abstractions;

public interface IJwtProvider
{
    string Generate(Member member);
}
