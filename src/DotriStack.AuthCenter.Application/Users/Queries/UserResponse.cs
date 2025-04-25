namespace DotriStack.AuthCenter.Application.Users.Queries;

public sealed record UserResponse(
    Guid Id,
    string Email,
    string FirstName,
    string LastName,
    bool IsActive,
    DateTime CreatedAt,
    DateTime? UpdatedAt); 