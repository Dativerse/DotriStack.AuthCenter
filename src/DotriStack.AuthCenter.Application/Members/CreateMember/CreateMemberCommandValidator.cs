using DotriStack.AuthCenter.Domain.ValueObjects;
using FluentValidation;

namespace DotriStack.AuthCenter.Application.Members.CreateMember;
internal class CreateMemberCommandValidator : AbstractValidator<CreateMemberCommand>
{
    public CreateMemberCommandValidator()
    {
        RuleFor(x => x.Email).NotEmpty();

        RuleFor(x => x.FirstName).NotEmpty().MaximumLength(FirstName.MaxLength);

        RuleFor(x => x.LastName).NotEmpty().MaximumLength(LastName.MaxLength);
    }
}
