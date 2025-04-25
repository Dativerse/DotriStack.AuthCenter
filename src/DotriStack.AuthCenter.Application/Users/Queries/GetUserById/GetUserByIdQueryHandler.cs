using DotriStack.AuthCenter.Application.Abstractions.Messaging;
using DotriStack.AuthCenter.Domain.Errors;
using DotriStack.AuthCenter.Domain.Primitives;
using Microsoft.AspNetCore.Identity;
using DotriStack.AuthCenter.Domain.Entities;

namespace DotriStack.AuthCenter.Application.Users.Queries.GetUserById;

internal sealed class GetUserByIdQueryHandler : IQueryHandler<GetUserByIdQuery, UserResponse>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public GetUserByIdQueryHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Result<UserResponse>> Handle(GetUserByIdQuery query, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(query.UserId.ToString());

        if (user is null)
        {
            return Result.Failure<UserResponse>(DomainErrors.User.NotFound(query.UserId));
        }

        return Result.Success(new UserResponse(
            user.Id,
            user.Email!,
            user.FirstName,
            user.LastName,
            user.IsActive,
            user.CreatedAt,
            user.UpdatedAt));
    }
} 