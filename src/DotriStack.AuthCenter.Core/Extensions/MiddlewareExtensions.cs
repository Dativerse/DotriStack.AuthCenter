using System.Net.Mime;
using DotriStack.AuthCenter.Core.Extensions;
using DotriStack.AuthCenter.Core.Middleware;
using Microsoft.AspNetCore.Builder;

namespace DotriStack.AuthCenter.Core.Extensions
{
    public static class MiddleWareExtensions
    {
        public static IApplicationBuilder UseWhoAmICheck(this IApplicationBuilder app, string environment)
        {
            return app.UseHealthChecks("/whoami", new HealthCheckOptions
            {
                AllowCachingResponses = false,
                Predicate = _ => true,
                ResponseWriter = async (context, report) =>
                {
                    var result = JsonConvert.SerializeObject(new
                    {
                        status = report.Status.ToString(),
                        monitors = report.Entries.Select(e =>
                        {
                            var data = e.Value.Data.ToDictionary(_ => _.Key, _ => _.Value);
                            data["Env"] = environment;

                            return new
                            {
                                name = e.Key,
                                status = Enum.GetName(typeof(HealthStatus), e.Value.Status),
                                values = data
                            };
                        })
                    }, Formatting.Indented);


                    context.Response.ContentType = MediaTypeNames.Application.Json;
                    await context.Response.WriteAsync(result);
                }
            });
        }

        public static void UseErrorHandler(this IApplicationBuilder app)
        {
            app.UseMiddleware<ErrorHandler>();
        }

        public static void UseStaticFiles(this IApplicationBuilder app, bool isDev)
        {
            app.UseStaticFiles(new StaticFileOptions
            {
                OnPrepareResponse = ctx =>
                {
                    const int OneYear = 60 * 60 * 24 * 365;
                    ctx.Context.Response.Headers[HeaderNames.CacheControl] = isDev ?
                        "no-cache" :
                        "public,max-age=" + OneYear;
                    ctx.Context.Response.Headers[HeaderNames.AccessControlAllowOrigin] = "*";
                }
            });
        }

        public static void UseForwardedHttpScheme(this IApplicationBuilder app)
        {
            app.Use((ctx, next) =>
            {
                var scheme = ctx.Request.Headers["X-Forwarded-Proto"].ToString();

                if (!string.IsNullOrEmpty(scheme))
                {
                    ctx.Request.Scheme = scheme;
                }

                return next(ctx);
            });
        }
    }
}