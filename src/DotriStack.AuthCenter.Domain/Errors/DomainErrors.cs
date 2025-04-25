using System.Text.Json;
using DotriStack.AuthCenter.Domain.Shared;
using Microsoft.AspNetCore.Identity;

namespace DotriStack.AuthCenter.Domain.Errors;

public static class DomainErrors
{
    public static class User
    {
        public static Error EmailAlreadyInUse => new(
            "User.EmailAlreadyInUse",
            "The specified email is already in use");

        public static Error RegistrationFailed(IEnumerable<IdentityError> err) => new(
            "User.RegistrationFailed",
            JsonSerializer.Serialize(err));

        public static Error NotFound(Guid id) => new(
            "User.NotFound",
            $"The user with the identifier {id} was not found.");

        public static Error InvalidCredentials => new(
            "User.InvalidCredentials",
            "The provided credentials are invalid");
    }

    public static class Email
    {
        public static readonly Error Empty = new(
            "Email.Empty",
            "Email is empty");

        public static readonly Error TooLong = new(
            "Email.TooLong",
            "Email is too long");

        public static readonly Error InvalidFormat = new(
            "Email.InvalidFormat",
            "Email format is invalid");
    }

    public static class FirstName
    {
        public static readonly Error Empty = new(
            "FirstName.Empty",
            "First name is empty");

        public static readonly Error TooLong = new(
            "LastName.TooLong",
            "FirstName name is too long");
    }

    public static class LastName
    {
        public static readonly Error Empty = new(
            "LastName.Empty",
            "Last name is empty");

        public static readonly Error TooLong = new(
            "LastName.TooLong",
            "Last name is too long");
    }
}
