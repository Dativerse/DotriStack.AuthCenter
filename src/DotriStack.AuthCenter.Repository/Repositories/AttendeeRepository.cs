using DotriStack.AuthCenter.Domain.Entities;
using DotriStack.AuthCenter.Domain.Repositories;


namespace DotriStack.AuthCenter.Repository.Repositories;

internal sealed class AttendeeRepository : IAttendeeRepository
{
    private readonly ApplicationDbContext _dbContext;

    public AttendeeRepository(ApplicationDbContext dbContext) =>
        _dbContext = dbContext;

    public void Add(Attendee attendee) =>
        _dbContext.Set<Attendee>().Add(attendee);
}
