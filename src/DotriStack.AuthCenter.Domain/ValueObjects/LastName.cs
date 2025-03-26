using DotriStack.AuthCenter.Domain.Errors;
using DotriStack.AuthCenter.Domain.Primitives;
using DotriStack.AuthCenter.Domain.Shared;

namespace DotriStack.AuthCenter.Domain.ValueObjects;

public sealed class LastName : ValueObject
{
    public const int MaxLength = 50;

    private LastName(string value)
    {
        Value = value;
    }

    private LastName()
    {
    }

    public string Value { get; private set; }

    public static Result<LastName> Create(string lastName)
    {
        if (string.IsNullOrWhiteSpace(lastName))
        {
            return Result.Failure<LastName>(DomainErrors.LastName.Empty);
        }

        if (lastName.Length > MaxLength)
        {
            return Result.Failure<LastName>(DomainErrors.LastName.TooLong);
        }

        return new LastName(lastName);
    }

    public override IEnumerable<object> GetAtomicValues()
    {
        yield return Value;
    }
}
