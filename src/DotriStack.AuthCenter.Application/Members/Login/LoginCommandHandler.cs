using DotriStack.AuthCenter.Application.Abstractions;
using DotriStack.AuthCenter.Application.Abstractions.Messaging;
using DotriStack.AuthCenter.Domain.Entities;
using DotriStack.AuthCenter.Domain.Errors;
using DotriStack.AuthCenter.Domain.Repositories;
using DotriStack.AuthCenter.Domain.Shared;
using DotriStack.AuthCenter.Domain.ValueObjects;

namespace DotriStack.AuthCenter.Application.Members.Login;

internal sealed class LoginCommandHandler : ICommandHandler<LoginCommand, string>
{
    private readonly IMemberRepository _memberRepository;
    private readonly IJwtProvider _jwtProvider;

    public LoginCommandHandler(
        IMemberRepository memberRepository,
        IJwtProvider jwtProvider)
    {
        _memberRepository = memberRepository;
        _jwtProvider = jwtProvider;
    }

    public async Task<Result<string>> Handle(
        LoginCommand request,
        CancellationToken cancellationToken)
    {
        Result<Email> email = Email.Create(request.Email);

        Member? member = await _memberRepository.GetByEmailAsync(
            email.Value,
            cancellationToken);

        if (member is null)
        {
            return Result.Failure<string>(
                DomainErrors.Member.InvalidCredentials);
        }

        string token = _jwtProvider.Generate(member);

        return token;
    }
}
