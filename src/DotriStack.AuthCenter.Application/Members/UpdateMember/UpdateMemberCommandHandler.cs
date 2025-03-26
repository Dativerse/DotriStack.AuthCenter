using DotriStack.AuthCenter.Application.Abstractions.Messaging;
using DotriStack.AuthCenter.Domain.Entities;
using DotriStack.AuthCenter.Domain.Errors;
using DotriStack.AuthCenter.Domain.Repositories;
using DotriStack.AuthCenter.Domain.Shared;
using DotriStack.AuthCenter.Domain.ValueObjects;

namespace DotriStack.AuthCenter.Application.Members.UpdateMember;

internal sealed class UpdateMemberCommandHandler : ICommandHandler<UpdateMemberCommand>
{
    private readonly IMemberRepository _memberRepository;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateMemberCommandHandler(
        IMemberRepository memberRepository,
        IUnitOfWork unitOfWork)
    {
        _memberRepository = memberRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(
        UpdateMemberCommand request,
        CancellationToken cancellationToken)
    {
        Member? member = await _memberRepository.GetByIdAsync(
            request.MemberId,
            cancellationToken);

        if (member is null)
        {
            return Result.Failure(DomainErrors.Member.NotFound(request.MemberId));
        }

        Result<FirstName> firstNameResult = FirstName.Create(request.FirstName);
        Result<LastName> lastNameResult = LastName.Create(request.LastName);

        member.ChangeName(
            firstNameResult.Value,
            lastNameResult.Value);

        _memberRepository.Update(member);

        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
