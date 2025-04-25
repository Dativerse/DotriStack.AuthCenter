using DotriStack.AuthCenter.Application.Users.Commands.RegisterUser;
using DotriStack.AuthCenter.Presentation.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace DotriStack.AuthCenter.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ISender _sender;

    public UsersController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterUserRequest request)
    {
        var command = new RegisterUserCommand(
            request.Email,
            request.FirstName,
            request.LastName,
            request.Password);

        var result = await _sender.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(new { UserId = result.Value });
    }
} 