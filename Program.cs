using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Alkemic.PortfolioWeb;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.StaticFiles;
using Alkemic.PortfolioWeb.Models;

var result = Server.LoadConfig();
if(result == false)
{
    Console.WriteLine($"[{nameof(Server)}] Exit program, Because cannot load config file");
    Console.WriteLine($"");
    return;
}

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddHttpContextAccessor();

builder.Services.AddSingleton<AuthManager>();
builder.Services.AddScoped<HttpContextAccessor>();
builder.Services.AddScoped<AuthHandler>();
//Model
builder.Services.AddDbContextFactory<AuthContext>();
builder.Services.AddDbContextFactory<PortfolioContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//X-Forwarded
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    ServeUnknownFileTypes = true,
    RequestPath = "/donut-space",
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Path.Combine(builder.Environment.ContentRootPath, "wwwroot", "build"))
    ),
    OnPrepareResponse = context =>
    {
        IHeaderDictionary headers = context.Context.Response.Headers;
        string contentType = headers["Content-Type"];
        if (context.File.Name.Contains(".js") == true)
        {
            headers["Content-Type"] = "application/javascript";
        }
        if (context.File.Name.Contains(".wasm") == true)
        {
            headers["Content-Type"] = "application/wasm";
        }

        if (context.File.Name.EndsWith(".gz"))
        {
            headers.Add("Content-Encoding", "gzip");
        }
        if (context.File.Name.EndsWith(".br"))
        {
            headers.Add("Content-Encoding", "br");
        }
    },
}); ;

app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
