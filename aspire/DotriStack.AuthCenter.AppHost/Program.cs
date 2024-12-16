var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.DotriStack_AuthCenter_ApiHost>("dotristack-authcenter-apihost");

builder.AddProject<Projects.DotriStack_AuthCenter_Samples_ApiHost>("dotristack-authcenter-samples-apihost");

builder.Build().Run();
