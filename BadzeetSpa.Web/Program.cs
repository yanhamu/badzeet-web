using Yarp.ReverseProxy.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<IProxyConfigProvider>(sp => new CustomProxyConfigProvider(sp.GetRequiredService<IConfiguration>()));
builder.Services.AddReverseProxy();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapReverseProxy();
});

app.MapFallbackToFile("index.html");

app.Run();
