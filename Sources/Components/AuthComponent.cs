using Microsoft.AspNetCore.Components;

namespace Alkemic.PortfolioWeb;

public class AuthComponent : BaseComponent
{

    [Inject]
    protected AuthHandler authHandler { get; private set; }

    protected Privilege privilege
    {
        get
        {
            if (authHandler?.AuthInfo != null) return authHandler.AuthInfo.Privilege;
            else return Privilege.None;
        }
    }

    protected AuthInfo authInfo => authHandler?.AuthInfo;

    protected AuthAttempt authAttempt => authHandler?.AuthAttempt;

    protected AuthState authState 
    {
        get
        {
            if (authHandler != null) return authHandler.AuthState;
            else return AuthState.None;
        }
    }

    protected bool IsAuthcating 
    {
        get => authHandler.SessionState == SessionState.NotLoaded ||
               authHandler.SessionState == SessionState.Loading;
    }

    protected virtual bool isLoading
    {
        get => IsAuthcating;
    }
    protected override async Task OnInitializedAsync()
    {
        authHandler.onLogin += OnLogin;
        authHandler.onLogout += OnLogout;
        authHandler.onFailed += OnFailed;
        authHandler.onRestricted += OnRestricted;
        authHandler.onSessionLoaded += OnSessionLoaded;
        await base.OnInitializedAsync();
    }

	public override async ValueTask DisposeAsync()
	{
        authHandler.onSessionLoaded -= OnSessionLoaded;
        authHandler.onLogin -= OnLogin;
        authHandler.onLogout -= OnLogout;
        authHandler.onFailed -= OnFailed;
        authHandler.onRestricted -= OnRestricted;
        await base.DisposeAsync();
	}

    protected virtual void OnSessionLoaded()
    {
        StateHasChanged();
    }

    protected virtual void OnLogin()
    {
        StateHasChanged();
    }

    protected virtual void OnLogout()
    {
        StateHasChanged();
    }

    protected virtual void OnRestricted()
    {
        StateHasChanged();
    }

    protected virtual void OnFailed()
    {
        StateHasChanged();
    }

}
