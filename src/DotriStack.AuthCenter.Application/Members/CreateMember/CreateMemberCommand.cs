using DotriStack.AuthCenter.Application.Abstractions.Messaging;

namespace DotriStack.AuthCenter.Application.Members.CreateMember;

public sealed record CreateMemberCommand(
    string Email,
    string FirstName,
    string LastName) : ICommand<Guid>;
