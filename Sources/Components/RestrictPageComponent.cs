using Microsoft.AspNetCore.Components;

namespace Alkemic.PortfolioWeb;

public class RestrictPageComponent : PageComponent
{
    [Inject]
    protected NavigationManager navigation { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);
        if (IsAuthcating == false && authState != AuthState.Allowed)
        {
            navigation.NavigateTo("/");   
        }
    }

}
