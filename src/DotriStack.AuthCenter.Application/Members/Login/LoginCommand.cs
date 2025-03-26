using DotriStack.AuthCenter.Application.Abstractions.Messaging;

namespace DotriStack.AuthCenter.Application.Members.Login;

public record LoginCommand(string Email) : ICommand<string>;
