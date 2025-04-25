using System.ComponentModel.DataAnnotations;

namespace DotriStack.AuthCenter.Presentation.Contracts;

public sealed record UpdateUserRequest(
    [Required]
    [StringLength(50, MinimumLength = 2)]
    string FirstName,

    [Required]
    [StringLength(50, MinimumLength = 2)]
    string LastName); 