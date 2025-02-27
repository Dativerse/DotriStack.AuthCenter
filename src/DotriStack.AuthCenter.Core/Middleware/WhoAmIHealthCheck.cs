﻿using System.Net;
using System.Net.Sockets;
using System.Collections.ObjectModel;
using System.Globalization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace DotriStack.AuthCenter.Core.Middleware
{
    public class WhoAmIHealthCheck : IHealthCheck
    {
        private readonly IWebHostEnvironment env;

        private readonly IHttpContextAccessor httpContextAccessor;

        public WhoAmIHealthCheck(IHttpContextAccessor httpContextAccessor, IWebHostEnvironment env)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.env = env;
        }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context,
                                                              CancellationToken cancellationToken = default)
        {
            IDictionary<string, object> result = new Dictionary<string, object>
            {
                { "Env", env.EnvironmentName }
            };
            await AddServerIPInfo(result);
            AddExtraServerInfo(result);

            return HealthCheckResult.Healthy("Server Info", new ReadOnlyDictionary<string, object>(result));
        }

        private static async Task AddServerIPInfo(IDictionary<string, object> result)
        {
            var hostName = Dns.GetHostName();
            result.Add("Host Name", hostName);

            var serverIps = await Dns.GetHostAddressesAsync(hostName).ConfigureAwait(false);

            for (var i = 0; i < serverIps.Length; i++)
            {
                if (serverIps[i].AddressFamily == AddressFamily.InterNetwork)
                {
                    result.Add($"IP{i}", serverIps[i].ToString());
                }
            }
        }

        private void AddExtraServerInfo(IDictionary<string, object> result)
        {
            var context = httpContextAccessor.HttpContext;
            result.Add("Local Ip", context.Connection.LocalIpAddress.ToString());
            result.Add("Local Port", context.Connection.LocalPort);
            result.Add("Client Ip", context.Connection.RemoteIpAddress.ToString());
            result.Add("Server Time", DateTimeOffset.Now.LocalDateTime.ToString(CultureInfo.InvariantCulture));
            result.Add("Last Updated",
                File.GetCreationTime(typeof(WhoAmIHealthCheck).Assembly.Location)
                    .ToString(CultureInfo.InvariantCulture));
            result.Add("Host", context.Request.Host);
            result.Add("Schema", context.Request.Scheme);
        }
    }
}