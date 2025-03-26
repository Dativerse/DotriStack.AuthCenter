using DotriStack.AuthCenter.Application.Abstractions.Messaging;

namespace DotriStack.AuthCenter.Application.Members.UpdateMember;

public sealed record UpdateMemberCommand(Guid MemberId, string FirstName, string LastName) : ICommand;
