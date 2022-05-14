using Microsoft.Extensions.Primitives;
using Yarp.ReverseProxy.Configuration;
using Yarp.ReverseProxy.LoadBalancing;
using Yarp.ReverseProxy.Transforms;

internal class CustomProxyConfigProvider : IProxyConfigProvider
{
    private CustomMemoryConfig config;

    public CustomProxyConfigProvider(IConfiguration configuration)
    {
        var localhost = configuration["localhost"];
        var backendhost = configuration["backendhost"];

        var allRoutes = new List<RouteConfig>();
        var routeConfig = new RouteConfig
        {
            RouteId = "route1",
            ClusterId = "cluster1",
            Match = new RouteMatch
            {
                Path = "/"
            },
            Order = 20
        };

        routeConfig = routeConfig.WithTransformPathSet(new PathString("/index.html"));
        allRoutes.Add(routeConfig);

        //var midRouteConfig = new RouteConfig
        //{
        //    RouteId = "route3",
        //    ClusterId = "cluster1",
        //    Match = new RouteMatch
        //    {
        //        Path = "/{**catch-all}"
        //    },
        //    Order = 30
        //};

        //midRouteConfig = midRouteConfig.WithTransformPathPrefix(new PathString("/kokot"));
        //allRoutes.Add(midRouteConfig);

        var backendRoute = new RouteConfig
        {
            RouteId = "backendRoute",
            ClusterId = "backend",
            Match = new RouteMatch
            {
                Path = "/backend/{**catch-all}"
            },
            Order = 10,
        };

        backendRoute = backendRoute.WithTransformPathRemovePrefix(new PathString("/backend"));
        allRoutes.Add(backendRoute);

        var clusterConfigs = new[]
        {
                new ClusterConfig
                {
                    ClusterId = "cluster1",
                    LoadBalancingPolicy = LoadBalancingPolicies.FirstAlphabetical, // todo try to remove
                    Destinations = new Dictionary<string, DestinationConfig>
                    {
                        { "destination1", new DestinationConfig { Address = localhost } }
                    }
                },
                new ClusterConfig
                {
                    ClusterId = "backend",
                    LoadBalancingPolicy= LoadBalancingPolicies.FirstAlphabetical, Destinations = new Dictionary<string, DestinationConfig>
                    {
                        {"destination2", new DestinationConfig{ Address = backendhost } }
                    }
                }
            };

        config = new CustomMemoryConfig(allRoutes, clusterConfigs);
    }

    public IProxyConfig GetConfig() => config;

    private class CustomMemoryConfig : IProxyConfig
    {
        private readonly CancellationTokenSource _cts = new CancellationTokenSource();

        public CustomMemoryConfig(IReadOnlyList<RouteConfig> routes, IReadOnlyList<ClusterConfig> clusters)
        {
            Routes = routes;
            Clusters = clusters;
            ChangeToken = new CancellationChangeToken(_cts.Token);
        }

        public IReadOnlyList<RouteConfig> Routes { get; }

        public IReadOnlyList<ClusterConfig> Clusters { get; }

        public IChangeToken ChangeToken { get; }
    }
}
