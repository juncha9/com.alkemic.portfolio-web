namespace Alkemic.PortfolioWeb;

[Serializable]
public class AuthInfo
{
    public Guid Uid { get; set; } = Guid.NewGuid();

    public string Address { get; set; } = "";

    public Privilege Privilege { get; set; } = Privilege.None;

    public string ID { get; set; } = "";

    public AuthInfo() { }

    public AuthInfo(string address, Privilege privilege, string id = "")
    {
        
        this.Address = address;
        this.Privilege = Privilege;
        if(string.IsNullOrWhiteSpace(id) == false)
        {
            this.ID = id;
        }
    }

}
