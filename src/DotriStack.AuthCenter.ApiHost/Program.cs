using DotriStack.AuthCenter.ApiHost.OptionsSetup;
using DotriStack.AuthCenter.Application.Behaviors;
using DotriStack.AuthCenter.Domain.Repositories;
using DotriStack.AuthCenter.Infrastructure.BackgroundJobs;
using DotriStack.AuthCenter.Infrastructure.Idempotence;
using DotriStack.AuthCenter.Repository;
using DotriStack.AuthCenter.Repository.Interceptors;
using DotriStack.AuthCenter.Repository.Repositories;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Quartz;
using Scrutor;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IMemberRepository, MemberRepository>();
// builder.Services.Decorate<IMemberRepository, CachedMemberRepository>();

builder.Services.AddStackExchangeRedisCache(redisOptions =>
{
    string connection = builder.Configuration
        .GetConnectionString("Redis")!;

    redisOptions.Configuration = connection;
});

builder.Services
    .Scan(
        selector => selector
            .FromAssemblies(DotriStack.AuthCenter.Infrastructure.AssemblyReference.Assembly,AssemblyReference.Assembly)
            .AddClasses(false)
            .UsingRegistrationStrategy(RegistrationStrategy.Skip)
            .AsImplementedInterfaces()
            .WithScopedLifetime());

builder.Services.AddMemoryCache();

builder.Services.AddMediatR(config => config.RegisterServicesFromAssembly(DotriStack.AuthCenter.Application.AssemblyReference.Assembly));

builder.Services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationPipelineBehavior<,>));

builder.Services.Decorate(typeof(INotificationHandler<>), typeof(IdempotentDomainEventHandler<>));

builder.Services.AddValidatorsFromAssembly(
    DotriStack.AuthCenter.Application.AssemblyReference.Assembly,
    includeInternalTypes: true);

string connectionString = builder.Configuration.GetConnectionString("Database")!;

builder.Services.AddSingleton<ConvertDomainEventsToOutboxMessagesInterceptor>();

builder.Services.AddSingleton<UpdateAuditableEntitiesInterceptor>();

builder.Services.AddDbContext<ApplicationDbContext>(
    (sp, optionsBuilder) =>
    {
        optionsBuilder.UseNpgsql(connectionString);
    });

builder.Services.AddQuartz(configure =>
{
    var jobKey = new JobKey(nameof(ProcessOutboxMessagesJob));

    configure
        .AddJob<ProcessOutboxMessagesJob>(jobKey)
        .AddTrigger(
            trigger =>
                trigger.ForJob(jobKey)
                    .WithSimpleSchedule(
                        schedule =>
                            schedule.WithIntervalInSeconds(100)
                                .RepeatForever()));

    configure.UseMicrosoftDependencyInjectionJobFactory();
});

builder.Services.AddQuartzHostedService();

builder
    .Services
    .AddControllers()
    .AddApplicationPart(DotriStack.AuthCenter.Presentation.AssemblyReference.Assembly);

builder.Services.AddSwaggerGen();

builder.Services.ConfigureOptions<JwtOptionsSetup>();
builder.Services.ConfigureOptions<JwtBearerOptionsSetup>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer();

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
