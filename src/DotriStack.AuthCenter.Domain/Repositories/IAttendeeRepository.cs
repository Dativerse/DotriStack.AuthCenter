using DotriStack.AuthCenter.Domain.Entities;

namespace DotriStack.AuthCenter.Domain.Repositories;

public interface IAttendeeRepository
{
    void Add(Attendee attendee);
}