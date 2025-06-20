using Microsoft.AspNetCore.Authentication.JwtBearer;
using Quartz;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddMemoryCache();

builder.Services.AddQuartzHostedService();

builder
    .Services
    .AddControllers()
    .AddApplicationPart(DotriStack.AuthCenter.Presentation.AssemblyReference.Assembly);

builder.Services.AddSwaggerGen();

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
