using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Components.Routing;

namespace Alkemic.PortfolioWeb;

public class BaseComponent : ComponentBase, IAsyncDisposable
{
    private const string CHECK_JS = "isJSInited";

    [Inject]
    protected IJSRuntime jsRuntime { get; set; }

    [CascadingParameter(Name = "RemoteIP")]
    public string RemoteIP { get; set; }

    [CascadingParameter(Name = "UserAgent")]
    public string UserAgent { get; set; }

    protected bool isDesktop => UserAgent.Contains("Windows") || UserAgent.Contains("Macintosh");

	public virtual async ValueTask DisposeAsync()
    {
        
    }

    protected void Log(string message)
    {
        jsRuntime.InvokeVoidAsync("console.log", message);
    }

    protected void LogWarning(string message)
    {
        jsRuntime.InvokeVoidAsync("console.warn", message);
    }

    protected void LogError(string message)
    {
        jsRuntime.InvokeVoidAsync("console.error", message);
    }

    
}
