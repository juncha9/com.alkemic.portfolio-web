namespace Alkemic.PortfolioWeb.Flows;


public class FlowItem
{
    public string CurLocation { get; set; } = "";

    public string PrevLink { get; set; } = "";
    public string NextLink { get; set; } = "";
}



public class LocationFlowManager
{
    public static List<FlowItem> Flows = new List<FlowItem>();

    public void GetNextURL(string curLocation)
    {
        

    }

}
