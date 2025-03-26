using DotriStack.AuthCenter.Application.Abstractions.Messaging;

namespace DotriStack.AuthCenter.Application.Members.GetMemberById;

public sealed record GetMemberByIdQuery(Guid MemberId) : IQuery<MemberResponse>;