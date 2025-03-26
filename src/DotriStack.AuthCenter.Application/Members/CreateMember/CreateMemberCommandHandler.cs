using DotriStack.AuthCenter.Application.Abstractions.Messaging;
using DotriStack.AuthCenter.Domain.Entities;
using DotriStack.AuthCenter.Domain.Errors;
using DotriStack.AuthCenter.Domain.Repositories;
using DotriStack.AuthCenter.Domain.Shared;
using DotriStack.AuthCenter.Domain.ValueObjects;

namespace DotriStack.AuthCenter.Application.Members.CreateMember;

internal sealed class CreateMemberCommandHandler : ICommandHandler<CreateMemberCommand, Guid>
{
    private readonly IMemberRepository _memberRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateMemberCommandHandler(
        IMemberRepository memberRepository,
        IUnitOfWork unitOfWork)
    {
        _memberRepository = memberRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Guid>> Handle(CreateMemberCommand request, CancellationToken cancellationToken)
    {
        Result<Email> emailResult = Email.Create(request.Email);

        if (emailResult.IsFailure)
        {
            return Result.Failure<Guid>(emailResult.Error);
        }

        Result<FirstName> firstNameResult = FirstName.Create(request.FirstName);
        Result<LastName> lastNameResult = LastName.Create(request.LastName);

        if (!await _memberRepository.IsEmailUniqueAsync(emailResult.Value, cancellationToken))
        {
            return Result.Failure<Guid>(DomainErrors.Member.EmailAlreadyInUse);
        }

        var member = Member.Create(
            Guid.NewGuid(),
            emailResult.Value,
            firstNameResult.Value,
            lastNameResult.Value);

        _memberRepository.Add(member);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return member.Id;
    }
}
